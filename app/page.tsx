"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { loadImage } from "./images";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import JokerSelector from "./components/JokerSelector";

interface SortableJokerProps {
  joker: string;
  index: number;
  isLoading: boolean;
  removeJoker: (index: number) => void;
  isAnyJokerDragging: boolean;
}

// Sortable joker component
function SortableJoker({ joker, index, isLoading, removeJoker, isAnyJokerDragging }: SortableJokerProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: `joker-${index}` });

  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  const style = {
    transform: CSS.Transform.toString(
      isDragging 
        ? { ...transform, x: transform?.x || 0, y: transform?.y || 0, scaleX: 1.1, scaleY: 1.1 } 
        : transform
    ),
    // Transition is only applied when dragging
    transition: isAnyJokerDragging ? transition : undefined,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  useEffect(() => {
    if (isDragging) {
      setIsHovered(false);
    }
  }, [isDragging]);

  const handleMouseEnter = () => {
    if (!isDragging) {
      setIsHovered(true);
    }
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      {...attributes}
      {...listeners}
    >
      <Image
        src={`/jokers/${joker}.png`}
        alt={joker}
        width={73}
        height={97}
        quality={100}
        unoptimized={true}
        className={`${isLoading ? "" : "cursor-grab"} ${isDragging ? "cursor-grabbing" : ""}`}
      />
      {/* X button - only show when hovering AND not dragging AND no other joker is being dragged */}
      {isHovered && !isLoading && !isDragging && !isAnyJokerDragging && (
        <button
          onClick={(e) => {
            // Prevent drag from starting when clicking the remove button
            e.stopPropagation();
            e.preventDefault();
            removeJoker(index);
          }}
          onMouseDown={(e) => {
            // Prevent drag from starting when clicking the remove button
            e.stopPropagation();
          }}
          onPointerDown={(e) => {
            // Prevent drag from starting when clicking the remove button
            e.stopPropagation();
          }}
          className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white transform translate-x-1/3 -translate-y-1/3 hover:bg-red-600 transition-colors z-20"
          aria-label="Remove joker"
        >
          <span className="text-xs font-bold">×</span>
        </button>
      )}
    </div>
  );
}

export default function Home() {
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [jokerList, setJokerList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [isAnyJokerDragging, setIsAnyJokerDragging] = useState<boolean>(false);
  const [isJokerSelectorOpen, setIsJokerSelectorOpen] = useState<boolean>(false);

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Whenever the joker list changes, regenerate the preview image
  useEffect(() => {
    const processImage = async () => {
      setIsLoading(true);
      try {
        const image = await loadImage(jokerList);
        setProcessedImage(image);
      } catch (error) {
        console.error("Error processing image:", error);
      } finally {
        setIsLoading(false);
        setInitialLoad(false);
      }
    };

    processImage();
  }, [jokerList]);

  // Function to remove a joker from the list
  const removeJoker = (indexToRemove: number) => {
    if (isLoading) return;
    
    const newJokerList = jokerList.filter((_, index) => index !== indexToRemove);
    setJokerList(newJokerList);
  };

  // Handle drag start event
  const handleDragStart = () => {
    setIsAnyJokerDragging(true);
  };

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    setIsAnyJokerDragging(false);
    
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setJokerList((items) => {
        const oldIndex = parseInt(active.id.toString().split('-')[1]);
        const newIndex = parseInt(over.id.toString().split('-')[1]);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Handle joker selection
  const handleJokerSelect = (joker: string) => {
    if (jokerList.length < 5) {
      setJokerList([...jokerList, joker]);
    }
    setIsJokerSelectorOpen(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-5xl font-bold">Balathumb</h1>

      {/* Big loading circle */}
      {isLoading && initialLoad && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* User interface */}
      {processedImage && (<div className="mt-16 flex items-start -ml-64">
        <div className="relative">
          {/* Thumbnail preview */}
          <Image
            className={`mr-8 ${isLoading ? "opacity-50" : ""}`}
            src={processedImage}
            alt="Thumbnail"
            width={640}
            height={360}
            quality={100}
          />
          {/* Small loading circle */}
          {isLoading && (
            <div className="absolute -ml-8 inset-0 flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
        {/* Card organization */}
        <div className="flex flex-col">
          <h2 className="text-3xl font-semibold pt-0 mb-4">Jokers</h2>
          {/* Joker list with dnd kit */}
          <div className="flex space-x-4" style={{ minWidth: '425px' }}>
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
            >
              <SortableContext 
                items={jokerList.map((_, index) => `joker-${index}`)}
                strategy={horizontalListSortingStrategy}
              >
                {jokerList.map((joker, index) => (
                  <SortableJoker
                    key={`joker-${index}`} 
                    joker={joker}
                    index={index}
                    isLoading={isLoading}
                    removeJoker={removeJoker}
                    isAnyJokerDragging={isAnyJokerDragging}
                  />
                ))}
              </SortableContext>
            </DndContext>
            
            {jokerList.length < 5 && <Image
              src="/add.png"
              alt="Add Joker"
              width={73}
              height={97}
              quality={100}
              unoptimized={true}
              className={`${isLoading ? "opacity-50 cursor-wait" : "cursor-pointer"}`}
              onClick={() => {
                if (isLoading) return;
                setIsJokerSelectorOpen(true);
              }}
            />}

            {/* Add invisible placeholder jokers to maintain layout */}
            {Array.from({ length: Math.max(0, 5 - jokerList.length - (jokerList.length < 5 ? 1 : 0)) }).map((_, index) => (
              <div key={`placeholder-${index}`} className="w-[73px] h-[97px] invisible" />
            ))}
          </div>
        </div>
      </div>)}

      {/* Joker Selector Modal */}
      <JokerSelector 
        isVisible={isJokerSelectorOpen}
        onSelect={handleJokerSelect}
        onClose={() => setIsJokerSelectorOpen(false)}
      />
    </main>
  );
}
