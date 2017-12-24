import xs from 'xstream';
import isolate from '@cycle/isolate';
import {Sources, Sinks, LabeledSliderState} from './interfaces';
import LabledSlider from './components/LabeledSlider';

export function App(sources: Sources): Sinks {
  const WeightSlider = isolate(LabledSlider, 'weight');
  const HeightSlider = isolate(LabledSlider, 'height');
  const vdom$ = xs
    .combine(
      WeightSlider({
        ...sources,
        props: xs.of({
          label: 'test',
          unit: 'test',
          value: 10,
          min: 2,
          max: 20,
        } as LabeledSliderState),
      }).DOM,
      HeightSlider({
        ...sources,
        props: xs.of({
          label: 'test',
          unit: 'test',
          value: 10,
          min: 2,
          max: 20,
        } as LabeledSliderState),
      }).DOM
    )
    .map(([weight, height]) => (
      <div>
        {weight}
        {height}
      </div>
    ));

  return {
    DOM: vdom$,
  };
}
