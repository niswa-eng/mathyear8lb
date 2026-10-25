/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, PenTool, Hand, Keyboard, Touchpad } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-black/45 backdrop-blur-xs flex items-center justify-center p-6 select-none">
      <div className="bg-[#FAF8F3] border-4 border-[#0F1E36] rounded-3xl max-w-2xl w-full p-8 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#E3DED4] pb-4">
          <div className="text-3xl font-black text-[#0F1E36]">
            Teacher Whiteboard Guide
          </div>
          <button
            onClick={onClose}
            aria-label="Close guide"
            className="w-12 h-12 rounded-xl bg-white border border-[#E3DED4] flex items-center justify-center text-[#0F1E36] active:scale-95 hover:bg-[#E3DED4]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content sections */}
        <div className="flex flex-col gap-6 text-[#0F1E36]">
          {/* Section 1: Whiteboard Mode */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#1D4ED8] text-white rounded-2xl shrink-0">
              <PenTool className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl font-black">Draw vs. Interact Modes</div>
              <p className="text-lg text-[#0F1E36]/80 mt-1">
                Tap the big <strong>Draw / Interact</strong> button on the floating toolbar to swap modes instantly:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-base font-bold">
                <li><strong>Draw Mode:</strong> Write, sketch, or highlight. Content underneath ignores pointer clicks.</li>
                <li><strong>Interact Mode:</strong> Manipulate diagrams, drag number line markers, rotate 3D solids, and advance steps.</li>
              </ul>
            </div>
          </div>

          {/* Section 2: Palm Rejection & Ink Storage */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#059669] text-white rounded-2xl shrink-0">
              <Touchpad className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl font-black">Palm Rejection & Ink Memory</div>
              <p className="text-lg text-[#0F1E36]/80 mt-1">
                Hardware stylus pens automatically suppress palm touches. All annotations are saved per slide in local storage so your working steps remain intact as you navigate back and forth.
              </p>
            </div>
          </div>

          {/* Section 3: Keyboard & Clicker Shortcuts */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#7C3AED] text-white rounded-2xl shrink-0">
              <Keyboard className="w-7 h-7" />
            </div>
            <div>
              <div className="text-2xl font-black">Presenter Clicker & Keyboard</div>
              <div className="grid grid-cols-2 gap-2 mt-2 text-base font-bold">
                <span className="bg-white px-3 py-1.5 rounded-lg border border-[#E3DED4]">Left Arrow / PageUp: Previous slide</span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-[#E3DED4]">Right Arrow / PageDown: Next slide</span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-[#E3DED4]">+ / - : Zoom In / Zoom Out</span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-[#E3DED4]">0: Reset Zoom (100%)</span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-[#E3DED4]">F: Toggle Fullscreen</span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-[#E3DED4]">D: Toggle Draw / Touch</span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-[#E3DED4]">E: Select Eraser</span>
                <span className="bg-white px-3 py-1.5 rounded-lg border border-[#E3DED4]">Z: Undo Stroke</span>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-4 rounded-2xl bg-[#0F1E36] text-white font-black text-2xl active:scale-98 mt-2"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
