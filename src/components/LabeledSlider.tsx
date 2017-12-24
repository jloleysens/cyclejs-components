import {Sources, LabeledSliderState, HTMLElementEvent} from '../interfaces';

export default function main(sources: Sources) {
  const domSource = sources.DOM;
  const props$ = sources.props;

  /* Intent */
  const newValue$ = domSource
    .select('.slider')
    .events('input')
    .map((ev: any) => ev.target.value);

  /* Model */
  const state$ = props$
    .map(props =>
      newValue$
        .map(val => ({
          label: props.label,
          unit: props.unit,
          min: props.min,
          value: val,
          max: props.max,
        }))
        .startWith(props) as any
    )
    .flatten()
    .remember();

  /* View */
  const vdom$ = state$.map((state: LabeledSliderState) => (
    <div className="labeled-slider">
      <span className="label">
        {state.label + ' ' + state.value + state.unit}
      </span>
      <input
        className="slider"
        type="range"
        min={state.min}
        max={state.max}
        value={state.value}
      />
    </div>
  ));

  const sinks = {
    DOM: vdom$,
    value: state$.map((state: LabeledSliderState) => state.value),
  };

  return sinks;
}
