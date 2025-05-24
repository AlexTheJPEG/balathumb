"use client";

import JokerEditor from "./components/JokerEditor";
import JokerImage from "./components/JokerImage";
import JokerSelector from "./components/JokerSelector";
import ResponsiveThumbnailPreview from "./components/ResponsiveThumbnailPreview";
import { ThumbJoker } from "./data/jokers";
import { loadImage } from "./images";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { useState, useEffect } from "react";

interface SortableJokerProps {
    tJoker: ThumbJoker;
    index: number;
    isLoading: boolean;
    removeJoker: (index: number) => void;
    isAnyJokerDragging: boolean;
    onJokerClick: (joker: ThumbJoker) => void;
}

function SortableJoker({
    tJoker,
    index,
    isLoading,
    removeJoker,
    isAnyJokerDragging,
    onJokerClick,
}: SortableJokerProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: `joker-${index}`,
    });

    const [isHovered, setIsHovered] = useState<boolean>(false);

    const style = {
        transform: CSS.Transform.toString(
            isDragging
                ? { ...transform, x: transform?.x || 0, y: transform?.y || 0, scaleX: 1.1, scaleY: 1.1 }
                : transform,
        ),
        // Transition is only applied when dragging
        transition: isAnyJokerDragging ? transition : undefined,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.8 : 1,
        cursor: isDragging ? "grabbing" : "grab",
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

    const handleClick = () => {
        if (!isDragging) {
            onJokerClick(tJoker);
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            {...attributes}
            {...listeners}
        >
            <JokerImage
                joker={tJoker.joker}
                width={73}
                height={97}
                edition={tJoker.edition}
                sticker={tJoker.sticker}
                stake={tJoker.stake}
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
                    className="absolute top-0 right-0 z-20 flex h-6 w-6 translate-x-1/3 -translate-y-1/3 transform items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
                    aria-label="Remove joker"
                >
                    <span className="text-xl font-bold">×</span>
                </button>
            )}
        </div>
    );
}

export default function Home() {
    const [jokerList, setJokerList] = useState<ThumbJoker[]>([]);
    const [isAnyJokerDragging, setIsAnyJokerDragging] = useState<boolean>(false);
    const [isJokerSelectorOpen, setIsJokerSelectorOpen] = useState<boolean>(false);
    const [selectedJoker, setSelectedJoker] = useState<ThumbJoker | null>(null);
    const [selectedJokerIndex, setSelectedJokerIndex] = useState<number | null>(null);
    const [isJokerEditorOpen, setIsJokerEditorOpen] = useState<boolean>(false);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    // Configure sensors for drag and drop
    const sensors = useSensors(
        useSensor(PointerSensor, {
            // Define activation constraints to better distinguish between clicks and drags
            activationConstraint: {
                // Only start dragging after moving at least 8px
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

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
                const oldIndex = parseInt(active.id.toString().split("-")[1]);
                const newIndex = parseInt(over.id.toString().split("-")[1]);

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

    // Handle image generation
    const handleGenerateImage = async () => {
        if (jokerList.length === 0) {
            alert("Please add at least one joker to generate a thumbnail.");
            return;
        }

        setIsGenerating(true);

        try {
            // Use the existing loadImage function
            const base64Image = await loadImage(jokerList);

            // Create and click a download link in one step
            const a = document.createElement("a");
            a.href = base64Image;
            a.download = `balathumb-${Date.now()}.png`;
            a.click();
        } catch (error) {
            console.error("Error generating image:", error);
            alert("Failed to generate image. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8 lg:p-24">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Balathumb</h1>

            {/* User interface */}
            <div className="mt-8 lg:mt-16 flex flex-col lg:flex-row items-center lg:items-start w-full max-w-7xl">
                <div className="relative mb-8 lg:mb-0 lg:mr-8 flex flex-col items-center w-full lg:w-auto">
                    <ResponsiveThumbnailPreview jokerList={jokerList} />

                    {/* Generate button */}
                    <button
                        onClick={handleGenerateImage}
                        disabled={isGenerating || jokerList.length === 0}
                        className={`mt-4 rounded-md px-6 py-2 font-semibold text-white ${
                            isGenerating || jokerList.length === 0
                                ? "cursor-not-allowed bg-gray-400"
                                : "bg-blue-600 hover:bg-blue-700"
                        } transition-colors`}
                    >
                        {isGenerating ? "Generating..." : "Generate Thumbnail"}
                    </button>
                    <p className="mt-2 text-gray-500">Note: Generated thumbnail may differ slightly from the preview</p>
                </div>

                {/* Card organization */}
                <div className="flex flex-col w-full lg:w-auto border rounded-lg p-4 lg:p-8 bg-gray-700">
                    {/* Joker list */}
                    <h2 className="mb-4 pt-0 text-2xl sm:text-3xl font-semibold text-center lg:text-left">Jokers</h2>
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start" style={{ minWidth: "auto" }}>
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
                        {Array.from({ length: Math.max(0, 5 - jokerList.length - (jokerList.length < 5 ? 1 : 0)) }).map(
                            (_, index) => (
                                <div key={`placeholder-${index}`} className="invisible h-[97px] w-[73px]" />
                            ),
                        )}
                    </div>
                </div>
            </div>

            {/* Joker selector modal */}
            <JokerSelector
                isVisible={isJokerSelectorOpen}
                onSelect={handleJokerSelect}
                onClose={() => setIsJokerSelectorOpen(false)}
            />

            {/* Joker editor modal */}
            <JokerEditor
                isVisible={isJokerEditorOpen}
                tJoker={selectedJoker}
                onClose={() => setIsJokerEditorOpen(false)}
                onSave={handleSaveJokerChanges}
            />
        </main>
    );
}
