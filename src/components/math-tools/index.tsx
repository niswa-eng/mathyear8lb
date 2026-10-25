/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import * as NumberTools from './NumberTools';
import * as AlgebraTools from './AlgebraTools';
import * as GraphTools from './GraphTools';
import * as GeometryTools from './GeometryTools';
import * as StatsTools from './StatsTools';

export const figureRegistry: Record<string, React.FC<any>> = {
  // Number
  NumberLine: NumberTools.NumberLine,
  PlaceValueChart: NumberTools.PlaceValueChart,
  FactorTree: NumberTools.FactorTree,
  PrimeFactorTool: NumberTools.PrimeFactorTool,
  IndexLawsTool: NumberTools.IndexLawsTool,
  StandardFormTool: NumberTools.StandardFormTool,
  SurdEstimator: NumberTools.SurdEstimator,
  RationalIrrationalTool: NumberTools.RationalIrrationalTool,
  RecurringDecimalTool: NumberTools.RecurringDecimalTool,
  ArithmeticLayout: NumberTools.ArithmeticLayout,
  BarModel: NumberTools.BarModel,
  DoubleNumberLine: NumberTools.DoubleNumberLine,
  FractionBar: NumberTools.FractionBar,
  FractionCircle: NumberTools.FractionCircle,
  CompoundPercentTool: NumberTools.CompoundPercentTool,
  ProportionTable: NumberTools.ProportionTable,
  DirectInverseProportionGraph: NumberTools.DirectInverseProportionGraph,

  // Algebra
  BalanceScale: AlgebraTools.BalanceScale,
  AlgebraTiles: AlgebraTools.AlgebraTiles,
  AreaModel: AlgebraTools.AreaModel,
  FunctionMachine: AlgebraTools.FunctionMachine,
  ExpressionBuilder: AlgebraTools.ExpressionBuilder,
  SequenceBuilder: AlgebraTools.SequenceBuilder,
  FormulaRearranger: AlgebraTools.FormulaRearranger,
  AlgebraicFractionTool: AlgebraTools.AlgebraicFractionTool,
  SimultaneousEquationsGraph: AlgebraTools.SimultaneousEquationsGraph,
  InequalityNumberLine: AlgebraTools.InequalityNumberLine,

  // Graphs
  CoordinateGrid: GraphTools.CoordinateGrid,
  QuadraticGraph: GraphTools.QuadraticGraph,
  TimeSeriesGraph: GraphTools.TimeSeriesGraph,
  ScatterGraph: GraphTools.ScatterGraph,
  ConversionGraph: GraphTools.ConversionGraph,

  // Geometry
  AnglesTool: GeometryTools.AnglesTool,
  ConstructionTool: GeometryTools.ConstructionTool,
  PythagorasTool: GeometryTools.PythagorasTool,
  CircleTool: GeometryTools.CircleTool,
  CompoundShapeTool: GeometryTools.CompoundShapeTool,
  BearingsTool: GeometryTools.BearingsTool,
  TransformationGrid: GeometryTools.TransformationGrid,
  MidpointGrid: GeometryTools.MidpointGrid,
  Solid3D: GeometryTools.Solid3D,
  SymmetryTool: GeometryTools.SymmetryTool,

  // Stats & Probability
  BarChart: StatsTools.BarChart,
  DualBarChart: StatsTools.DualBarChart,
  CompoundBarChart: StatsTools.CompoundBarChart,
  FrequencyDiagram: StatsTools.FrequencyDiagram,
  FrequencyPolygon: StatsTools.FrequencyPolygon,
  PieChart: StatsTools.PieChart,
  StemAndLeaf: StatsTools.StemAndLeaf,
  BackToBackStemLeaf: StatsTools.BackToBackStemLeaf,
  VennDiagram: StatsTools.VennDiagram,
  CarrollDiagram: StatsTools.CarrollDiagram,
  DataTable: StatsTools.DataTable,
  DotPlot: StatsTools.DotPlot,
  Spinner: StatsTools.Spinner,
  DiceRoller: StatsTools.DiceRoller,
  SampleSpaceGrid: StatsTools.SampleSpaceGrid,
  ProbabilityTree: StatsTools.ProbabilityTree,
  ProbabilityScale: StatsTools.ProbabilityScale,
};

export const MathFigure: React.FC<{ component: string; props?: Record<string, any> }> = ({
  component,
  props = {},
}) => {
  const Component = figureRegistry[component];

  if (!Component) {
    return (
      <div className="w-full max-w-lg mx-auto p-6 bg-[#FAF8F3] border-2 border-dashed border-[#C6BFB1] rounded-2xl flex flex-col items-center justify-center text-center">
        <span className="font-extrabold text-2xl text-[#0F1E36] mb-1">{component}</span>
        <span className="text-lg text-[#0F1E36]/70">Mathematical interactive tool</span>
      </div>
    );
  }

  return <Component {...props} />;
};
