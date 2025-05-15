"use client";

import { useState, useEffect } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import JokerSelector from "./components/JokerSelector";
import JokerEditor from "./components/JokerEditor";
import { ThumbJoker } from "./data/jokers";
import JokerImage from "./components/JokerImage";
import ThumbnailPreview from "./components/ThumbnailPreview";
import { loadImage } from "./images";
import Image from "next/image";

interface SortableJokerProps {
  tJoker: ThumbJoker;
  index: number;
  isLoading: boolean;
  removeJoker: (index: number) => void;
  isAnyJokerDragging: boolean;
  onJokerClick: (joker: ThumbJoker) => void;
}

// Sortable joker component
function SortableJoker({ tJoker, index, isLoading, removeJoker, isAnyJokerDragging, onJokerClick }: SortableJokerProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: `joker-${index}` });

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [clickStartTime, setClickStartTime] = useState<number | null>(null);
  
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

  // Handle mouse down to track potential clicks
  const handleMouseDown = () => {
    setClickStartTime(Date.now());
  };

  // Handle mouse up to distinguish between clicks and drags
  const handleMouseUp = () => {
    if (clickStartTime && (Date.now() - clickStartTime < 200)) {
      // If less than 200ms passed, consider it a click
      onJokerClick(tJoker);
    }
    setClickStartTime(null);
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...attributes}
      {...listeners}
    >
      <JokerImage joker={tJoker.joker} width={73} height={97} edition={tJoker.edition} />
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
  const [jokerList, setJokerList] = useState<ThumbJoker[]>([]);
  const [isAnyJokerDragging, setIsAnyJokerDragging] = useState<boolean>(false);
  const [isJokerSelectorOpen, setIsJokerSelectorOpen] = useState<boolean>(false);
  const [jokersDataPrefetched, setJokersDataPrefetched] = useState<boolean>(false);
  const [selectedJoker, setSelectedJoker] = useState<ThumbJoker | null>(null);
  const [selectedJokerIndex, setSelectedJokerIndex] = useState<number | null>(null);
  const [isJokerEditorOpen, setIsJokerEditorOpen] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Add this new useEffect for prefetching
  useEffect(() => {
    // Prefetch joker data when component mounts
    const prefetchJokerData = async () => {
      try {
        // Make a request to your API endpoint
        await fetch('/api/jokers');
        setJokersDataPrefetched(true);
      } catch (error) {
        console.error('Error prefetching joker data:', error);
      }
    };
    
    prefetchJokerData();
  }, []);

  // Function to remove a joker from the list
  const removeJoker = (indexToRemove: number) => {
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
  const handleJokerSelect = (joker: ThumbJoker) => {
    if (jokerList.length < 5) {
      setJokerList([...jokerList, joker]);
    }
    setIsJokerSelectorOpen(false);
  };

  // Handle joker click
  const handleJokerClick = (joker: ThumbJoker, index: number) => {
    setSelectedJoker(joker);
    setSelectedJokerIndex(index);
    setIsJokerEditorOpen(true);
  };

  // Handle saving joker changes
  const handleSaveJokerChanges = (updatedJoker: ThumbJoker) => {
    if (selectedJokerIndex !== null) {
      const newJokerList = [...jokerList];
      newJokerList[selectedJokerIndex] = updatedJoker;
      setJokerList(newJokerList);
    }
  };

  // Add this function to handle image generation
  const handleGenerateImage = async () => {
    if (jokerList.length === 0) {
      alert("Please add at least one joker to generate a thumbnail.");
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Use the existing loadImage function
      const base64Image = await loadImage(jokerList);
      
      // Create a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = base64Image;
      downloadLink.download = `balathumb-${Date.now()}.png`;
      
      // Append to body, click to trigger download, then remove
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-5xl font-bold">Balathumb</h1>

      {/* User interface */}
      <div className="mt-16 flex items-start -ml-64">
        <div className="relative mr-8 flex flex-col items-center">
          <ThumbnailPreview 
            jokerList={jokerList}
            width={640}
            height={360}
          />
          
          {/* Generate button */}
          <button 
            onClick={handleGenerateImage}
            disabled={isGenerating || jokerList.length === 0}
            className={`mt-4 px-6 py-2 rounded-md text-white font-semibold ${
              isGenerating || jokerList.length === 0 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors`}
          >
            {isGenerating ? 'Generating...' : 'Generate Thumbnail'}
          </button>
          <p className="text-gray-500 mt-2">Note: Generated thumbnail may differ slightly from the preview</p>
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
                    tJoker={joker}
                    index={index}
                    isLoading={false}
                    removeJoker={removeJoker}
                    isAnyJokerDragging={isAnyJokerDragging}
                    onJokerClick={(joker) => handleJokerClick(joker, index)}
                  />
                ))}
              </SortableContext>
            </DndContext>

            {jokerList.length < 5 && (
              <Image
              src="/add.png"
              alt="Add Joker"
              width={73}
              height={97}
              className="cursor-pointer"
              onClick={() => {
                setIsJokerSelectorOpen(true);
              }}
              />
            )}

            {/* Add invisible placeholder jokers to maintain layout */}
            {Array.from({ length: Math.max(0, 5 - jokerList.length - (jokerList.length < 5 ? 1 : 0)) }).map((_, index) => (
              <div key={`placeholder-${index}`} className="w-[73px] h-[97px] invisible" />
            ))}
          </div>
        </div>
      </div>

      {/* Joker Selector Modal */}
      <JokerSelector 
        isVisible={isJokerSelectorOpen}
        onSelect={handleJokerSelect}
        onClose={() => setIsJokerSelectorOpen(false)}
      />

      {/* Joker Detail Modal */}
      <JokerEditor
        isVisible={isJokerEditorOpen}
        tJoker={selectedJoker}
        onClose={() => setIsJokerEditorOpen(false)}
        onSave={handleSaveJokerChanges}
      />
    </main>
  );
}
