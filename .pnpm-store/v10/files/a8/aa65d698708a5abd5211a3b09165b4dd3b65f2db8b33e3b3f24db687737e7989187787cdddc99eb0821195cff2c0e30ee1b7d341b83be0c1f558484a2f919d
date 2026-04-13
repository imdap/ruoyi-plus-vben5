import { ResolvedConstraints } from '../types';
import { Axis, BoundingBox, Box, DragElastic } from 'framer-motion';
/**
 * Apply constraints to a point. These constraints are both physical along an
 * axis, and an elastic factor that determines how much to constrain the point
 * by if it does lie outside the defined parameters.
 */
export declare function applyConstraints(point: number, { min, max }: Partial<Axis>, elastic?: Axis): number;
export declare const defaultElastic = 0.35;
/**
 * Calculate constraints in terms of the viewport when
 * defined relatively to the measured bounding box.
 */
export declare function calcRelativeConstraints(layoutBox: Box, { top, left, bottom, right }: Partial<BoundingBox>): ResolvedConstraints;
/**
 * Calculate constraints in terms of the viewport when defined relatively to the
 * measured axis. This is measured from the nearest edge, so a max constraint of 200
 * on an axis with a max value of 300 would return a constraint of 500 - axis length
 */
export declare function calcRelativeAxisConstraints(axis: Axis, min?: number, max?: number): Partial<Axis>;
/**
 * Accepts a dragElastic prop and returns resolved elastic values for each axis.
 */
export declare function resolveDragElastic(dragElastic?: DragElastic): Box;
export declare function resolveAxisElastic(dragElastic: DragElastic, minLabel: string, maxLabel: string): Axis;
export declare function resolvePointElastic(dragElastic: DragElastic, label: string): number;
/**
 * Rebase the calculated viewport constraints relative to the layout.min point.
 */
export declare function rebaseAxisConstraints(layout: Axis, constraints: Partial<Axis>): Partial<Axis>;
/**
 * Calculate viewport constraints when defined as another viewport-relative box
 */
export declare function calcViewportConstraints(layoutBox: Box, constraintsBox: Box): {
    x: {
        min: number;
        max: number;
    };
    y: {
        min: number;
        max: number;
    };
};
/**
 * Calculate viewport constraints when defined as another viewport-relative axis
 */
export declare function calcViewportAxisConstraints(layoutAxis: Axis, constraintsAxis: Axis): {
    min: number;
    max: number;
};
/**
 * Calculate a transform origin relative to the source axis, between 0-1, that results
 * in an asthetically pleasing scale/transform needed to project from source to target.
 */
export declare function calcOrigin(source: Axis, target: Axis): number;
