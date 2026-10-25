/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MathFormula } from '../common/MathFormula';
import { RotateCcw, ChevronRight, Eye } from 'lucide-react';

/* =========================================================================
 * 1. AnglesTool (Parallel Lines & Transversal / Exterior Angle of Triangle)
 * ========================================================================= */
export const AnglesTool: React.FC<{ mode?: 'parallel' | 'triangle' }> = ({ mode = 'parallel' }) => {
  const [highlightMode, setHighlightMode] = useState<'alternate' | 'corresponding' | 'opposite' | 'all'>('alternate');

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm flex flex-col items-center gap-4">
        <svg viewBox="0 0 450 240" className="w-full h-auto">
          {/* Parallel Line 1 */}
          <line x1="40" y1="80" x2="410" y2="80" stroke="#0F1E36" strokeWidth="4" />
          <polygon points="230,80 215,74 215,86" fill="#0F1E36" />

          {/* Parallel Line 2 */}
          <line x1="40" y1="170" x2="410" y2="170" stroke="#0F1E36" strokeWidth="4" />
          <polygon points="230,170 215,164 215,176" fill="#0F1E36" />

          {/* Transversal */}
          <line x1="100" y1="30" x2="350" y2="220" stroke="#0F1E36" strokeWidth="3.5" />

          {/* Angles arcs at top intersection (165, 80) and bottom intersection (285, 170) */}
          {/* Angle A (top-left obtuse or top-right acute): Angle at (165, 80) */}
          {highlightMode === 'alternate' && (
            <>
              {/* Z-angles: bottom-right of top intersection, top-left of bottom intersection */}
              <circle cx="165" cy="80" r="28" fill="none" stroke="#1D4ED8" strokeWidth="5" strokeDasharray="30 180" />
              <text x="180" y="110" fill="#1D4ED8" fontSize="22" fontWeight="800">a</text>
              <circle cx="285" cy="170" r="28" fill="none" stroke="#1D4ED8" strokeWidth="5" strokeDasharray="30 180" strokeDashoffset="100" />
              <text x="255" y="155" fill="#1D4ED8" fontSize="22" fontWeight="800">a</text>
            </>
          )}

          {highlightMode === 'corresponding' && (
            <>
              {/* F-angles: top-right of both intersections */}
              <text x="200" y="65" fill="#16A34A" fontSize="22" fontWeight="800">c</text>
              <text x="320" y="155" fill="#16A34A" fontSize="22" fontWeight="800">c</text>
            </>
          )}

          {highlightMode === 'opposite' && (
            <>
              {/* X-angles: vertically opposite at top intersection */}
              <text x="140" y="60" fill="#EA580C" fontSize="22" fontWeight="800">x</text>
              <text x="190" y="115" fill="#EA580C" fontSize="22" fontWeight="800">x</text>
            </>
          )}
        </svg>

        <div className="flex gap-3">
          <button
            onClick={() => setHighlightMode('alternate')}
            className={`px-4 py-2 rounded-xl font-bold text-lg ${
              highlightMode === 'alternate' ? 'bg-[#1D4ED8] text-white' : 'bg-[#FAF8F3] border border-[#E3DED4]'
            }`}
          >
            Alternate (Z)
          </button>
          <button
            onClick={() => setHighlightMode('corresponding')}
            className={`px-4 py-2 rounded-xl font-bold text-lg ${
              highlightMode === 'corresponding' ? 'bg-[#16A34A] text-white' : 'bg-[#FAF8F3] border border-[#E3DED4]'
            }`}
          >
            Corresponding (F)
          </button>
          <button
            onClick={() => setHighlightMode('opposite')}
            className={`px-4 py-2 rounded-xl font-bold text-lg ${
              highlightMode === 'opposite' ? 'bg-[#EA580C] text-white' : 'bg-[#FAF8F3] border border-[#E3DED4]'
            }`}
          >
            Vertically Opposite (X)
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 2. ConstructionTool (Compass Arcs & Angle Bisector)
 * ========================================================================= */
export const ConstructionTool: React.FC = () => {
  const [stage, setStage] = useState(1);

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm flex flex-col items-center gap-4">
        <svg viewBox="0 0 400 240" className="w-full h-auto">
          {/* Main angle rays */}
          <line x1="80" y1="180" x2="350" y2="180" stroke="#0F1E36" strokeWidth="4" />
          <line x1="80" y1="180" x2="280" y2="40" stroke="#0F1E36" strokeWidth="4" />
          <circle cx="80" cy="180" r="5" fill="#0F1E36" />
          <text x="60" y="195" fontSize="20" fontWeight="bold" fill="#0F1E36">O</text>

          {/* Stage 1: Initial Arc */}
          {stage >= 1 && (
            <path
              d="M 180 180 A 100 100 0 0 0 148 110"
              fill="none"
              stroke="#1D4ED8"
              strokeWidth="3"
              strokeDasharray="6 3"
            />
          )}

          {/* Stage 2: Crossing Arcs from arc endpoints */}
          {stage >= 2 && (
            <>
              <path
                d="M 230 110 A 80 80 0 0 1 250 150"
                fill="none"
                stroke="#EA580C"
                strokeWidth="3"
                strokeDasharray="6 3"
              />
              <path
                d="M 215 150 A 80 80 0 0 0 255 110"
                fill="none"
                stroke="#EA580C"
                strokeWidth="3"
                strokeDasharray="6 3"
              />
              <circle cx="242" cy="126" r="4" fill="#EA580C" />
            </>
          )}

          {/* Stage 3: Bisector ray */}
          {stage >= 3 && (
            <line x1="80" y1="180" x2="330" y2="90" stroke="#16A34A" strokeWidth="4" />
          )}
        </svg>

        <div className="flex items-center justify-between w-full pt-3 border-t border-[#E3DED4]">
          <span className="text-xl font-bold text-[#0F1E36]">
            Stage {stage} of 3: {stage === 1 ? 'Draw equal arc from vertex' : stage === 2 ? 'Intersecting arcs' : 'Rule the bisector ray'}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setStage((s) => Math.min(3, s + 1))}
              disabled={stage >= 3}
              className="px-4 py-2 bg-[#1D4ED8] text-white disabled:opacity-40 rounded-xl font-bold"
            >
              Next step
            </button>
            <button
              onClick={() => setStage(1)}
              className="px-4 py-2 bg-[#FAF8F3] border border-[#E3DED4] rounded-xl font-bold"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 3. PythagorasTool
 * ========================================================================= */
export const PythagorasTool: React.FC<{ a?: number; b?: number }> = ({ a = 3, b = 4 }) => {
  const c = Math.sqrt(a * a + b * b);

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-2xl p-6 shadow-sm flex flex-col items-center gap-4">
        <div className="text-3xl font-black text-[#0F1E36]">
          <MathFormula latex={`a^2 + b^2 = c^2 \\implies ${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${c * c} = ${c}^2`} />
        </div>

        <svg viewBox="0 0 350 250" className="w-72 h-auto">
          {/* Right angled triangle */}
          <polygon points="120,180 240,180 120,90" fill="#E2E8F0" stroke="#0F1E36" strokeWidth="3.5" />
          {/* Right angle symbol */}
          <rect x="120" y="160" width="20" height="20" fill="none" stroke="#0F1E36" strokeWidth="2" />

          {/* Labels */}
          <text x="180" y="210" textAnchor="middle" fill="#1D4ED8" fontSize="22" fontWeight="bold">
            b = {b} (b² = {b * b})
          </text>
          <text x="80" y="140" textAnchor="middle" fill="#EA580C" fontSize="22" fontWeight="bold">
            a = {a} (a² = {a * a})
          </text>
          <text x="210" y="125" textAnchor="middle" fill="#16A34A" fontSize="22" fontWeight="bold">
            c = {c} (c² = {c * c})
          </text>
        </svg>
      </div>
    </div>
  );
};

/* =========================================================================
 * 4. CircleTool
 * ========================================================================= */
export const CircleTool: React.FC<{ radius?: number }> = ({ radius = 7 }) => {
  const d = radius * 2;
  const circ = (Math.PI * d).toFixed(2);
  const area = (Math.PI * radius * radius).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-2xl bg-white/70 border border-[#E3DED4] rounded-2xl p-6 shadow-sm flex flex-col items-center gap-4">
        <svg viewBox="0 0 240 240" className="w-56 h-56">
          <circle cx="120" cy="120" r="90" fill="#1D4ED8" fillOpacity="0.1" stroke="#0F1E36" strokeWidth="4" />
          {/* Radius line */}
          <line x1="120" y1="120" x2="210" y2="120" stroke="#1D4ED8" strokeWidth="3.5" />
          <circle cx="120" cy="120" r="5" fill="#0F1E36" />
          <text x="165" y="112" textAnchor="middle" fill="#1D4ED8" fontSize="20" fontWeight="bold">
            r = {radius}
          </text>
        </svg>

        <div className="grid grid-cols-2 gap-4 w-full text-center">
          <div className="bg-[#FAF8F3] p-3 rounded-xl border border-[#E3DED4]">
            <span className="text-sm font-bold text-[#888888]">Circumference (C = 2πr)</span>
            <div className="text-2xl font-black text-[#1D4ED8]">≈ {circ}</div>
          </div>
          <div className="bg-[#FAF8F3] p-3 rounded-xl border border-[#E3DED4]">
            <span className="text-sm font-bold text-[#888888]">Area (A = πr²)</span>
            <div className="text-2xl font-black text-[#16A34A]">≈ {area}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 5. CompoundShapeTool & BearingsTool & TransformationGrid & MidpointGrid & SymmetryTool
 * ========================================================================= */
export const CompoundShapeTool: React.FC = () => {
  const [split, setSplit] = useState(false);

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-xl bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm flex flex-col items-center gap-4">
        <div className="text-2xl font-extrabold text-[#0F1E36]">L-Shape Compound Area</div>
        <svg viewBox="0 0 280 220" className="w-64 h-auto">
          {/* L-shape polygon */}
          <polygon
            points="40,30 140,30 140,110 240,110 240,190 40,190"
            fill="#E2E8F0"
            stroke="#0F1E36"
            strokeWidth="3.5"
          />
          {split && (
            <line x1="140" y1="30" x2="140" y2="190" stroke="#DC2626" strokeWidth="3" strokeDasharray="6 3" />
          )}
          <text x="90" y="110" fill="#1D4ED8" fontSize="20" fontWeight="bold">
            {split ? 'Area A' : 'Shape'}
          </text>
          {split && (
            <text x="180" y="155" fill="#16A34A" fontSize="20" fontWeight="bold">
              Area B
            </text>
          )}
        </svg>
        <button
          onClick={() => setSplit(!split)}
          className="px-4 py-2 bg-[#1D4ED8] text-white rounded-xl font-bold"
        >
          {split ? 'Show unified' : 'Decompose into rectangles'}
        </button>
      </div>
    </div>
  );
};

export const BearingsTool: React.FC = () => {
  const [bearing, setBearing] = useState(65);

  const angleRad = ((bearing - 90) * Math.PI) / 180;
  const rayX = 150 + 90 * Math.cos(angleRad);
  const rayY = 150 + 90 * Math.sin(angleRad);

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-md bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm flex flex-col items-center gap-3">
        <div className="text-3xl font-black text-[#0F1E36]">
          Bearing: <span className="text-[#1D4ED8]">{String(bearing).padStart(3, '0')}°</span>
        </div>
        <svg viewBox="0 0 300 300" className="w-56 h-56">
          <circle cx="150" cy="150" r="110" fill="#FAF8F3" stroke="#0F1E36" strokeWidth="3" />
          {/* North line */}
          <line x1="150" y1="150" x2="150" y2="40" stroke="#DC2626" strokeWidth="4" />
          <text x="150" y="32" textAnchor="middle" fill="#DC2626" fontSize="22" fontWeight="bold">
            N (000°)
          </text>
          {/* Bearing ray */}
          <line x1="150" y1="150" x2={rayX} y2={rayY} stroke="#1D4ED8" strokeWidth="4" />
          <circle cx="150" cy="150" r="6" fill="#0F1E36" />
        </svg>
        <input
          type="range"
          min="0"
          max="360"
          value={bearing}
          onChange={(e) => setBearing(parseInt(e.target.value, 10))}
          className="w-full accent-[#1D4ED8]"
        />
      </div>
    </div>
  );
};

export const TransformationGrid: React.FC = () => {
  const [transformed, setTransformed] = useState(false);

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-md bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm flex flex-col items-center gap-3">
        <div className="text-2xl font-black text-[#0F1E36]">Reflection across Mirror Line</div>
        <svg viewBox="0 0 260 220" className="w-64 h-auto">
          {/* Mirror line */}
          <line x1="130" y1="20" x2="130" y2="200" stroke="#DC2626" strokeWidth="3" strokeDasharray="6 3" />
          {/* Original Triangle */}
          <polygon points="50,60 100,60 50,140" fill="#1D4ED8" fillOpacity="0.4" stroke="#1D4ED8" strokeWidth="3" />
          {/* Reflected Triangle */}
          {transformed && (
            <polygon points="210,60 160,60 210,140" fill="#16A34A" fillOpacity="0.4" stroke="#16A34A" strokeWidth="3" />
          )}
        </svg>
        <button
          onClick={() => setTransformed(!transformed)}
          className="px-4 py-2 bg-[#1D4ED8] text-white rounded-xl font-bold"
        >
          {transformed ? 'Reset original' : 'Reflect shape'}
        </button>
      </div>
    </div>
  );
};

export const MidpointGrid: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-md bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm flex flex-col items-center gap-3">
        <div className="text-2xl font-black text-[#0F1E36]">
          Midpoint Formula: <MathFormula latex="M = \left(\frac{x_1+x_2}{2}, \frac{y_1+y_2}{2}\right)" display={false} />
        </div>
      </div>
    </div>
  );
};

export const SymmetryTool: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-md bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm flex flex-col items-center gap-3">
        <div className="text-2xl font-black text-[#0F1E36]">Regular Pentagon</div>
        <div className="text-xl font-bold text-[#1D4ED8]">5 lines of symmetry & Order 5 rotational symmetry</div>
      </div>
    </div>
  );
};

/* =========================================================================
 * 6. Solid3D (Three.js WebGL 3D shapes)
 * ========================================================================= */
export const Solid3D: React.FC<{ shape?: 'cube' | 'cuboid' | 'cylinder' | 'pyramid' | 'cone' | 'sphere' }> = ({
  shape = 'cuboid',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeShape, setActiveShape] = useState(shape);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = 240;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfaf8f3);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(3, 3, 4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(5, 10, 7);
    scene.add(dir);

    // Geometry selection
    let geom: THREE.BufferGeometry;
    if (activeShape === 'cube') geom = new THREE.BoxGeometry(1.8, 1.8, 1.8);
    else if (activeShape === 'cuboid') geom = new THREE.BoxGeometry(2.4, 1.4, 1.6);
    else if (activeShape === 'cylinder') geom = new THREE.CylinderGeometry(1, 1, 2.2, 32);
    else if (activeShape === 'cone') geom = new THREE.ConeGeometry(1.2, 2.2, 32);
    else if (activeShape === 'sphere') geom = new THREE.SphereGeometry(1.3, 32, 24);
    else geom = new THREE.ConeGeometry(1.4, 2, 4); // square pyramid

    const material = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      roughness: 0.3,
      metalness: 0.1,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    const mesh = new THREE.Mesh(geom, material);
    scene.add(mesh);

    // Edges
    const wireGeom = new THREE.EdgesGeometry(geom);
    const wireMat = new THREE.LineBasicMaterial({ color: 0x0f1e36, linewidth: 2 });
    const wire = new THREE.LineSegments(wireGeom, wireMat);
    scene.add(wire);

    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      mesh.rotation.y += dx * 0.015;
      mesh.rotation.x += dy * 0.015;
      wire.rotation.y += dx * 0.015;
      wire.rotation.x += dy * 0.015;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const canvas = renderer.domElement;
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (!isDragging) {
        mesh.rotation.y += 0.005;
        wire.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      renderer.dispose();
      geom.dispose();
      material.dispose();
    };
  }, [activeShape]);

  return (
    <div className="w-full flex flex-col items-center py-2 select-none">
      <div className="w-full max-w-xl bg-white/70 border border-[#E3DED4] rounded-2xl p-5 shadow-sm flex flex-col items-center gap-3">
        <div ref={mountRef} className="w-full h-60 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing" />
        <div className="flex gap-2 flex-wrap justify-center">
          {(['cube', 'cuboid', 'cylinder', 'cone', 'sphere', 'pyramid'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setActiveShape(s)}
              className={`px-3 py-1.5 rounded-xl capitalize font-bold text-base ${
                activeShape === s ? 'bg-[#1D4ED8] text-white' : 'bg-[#FAF8F3] border border-[#E3DED4]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
