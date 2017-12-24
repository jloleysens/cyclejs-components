import xs from 'xstream';
import {Stream} from 'xstream';
import {DOMSource, VNode} from '@cycle/dom';

export type Sources = {
  DOM: DOMSource;
  props: Stream<LabeledSliderState>;
};

export type LabeledSliderState = {
  label: string;
  value: string | number;
  unit: string;
  min: number;
  max: number;
}

export type Sinks = {
  DOM: Stream<VNode>;
};

export type Component = (s: Sources) => Sinks;
