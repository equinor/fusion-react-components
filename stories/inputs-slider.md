# Inputs/Slider

> **Package:** `@equinor/eds-core-react` — `import { Slider } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `ariaLabelledby` | `string` | No |  | Id for the elements that labels this slider |
| `value` | `number | number[]` | No | [40, 60] | Components value, range of numbers |
| `onChange` | `(event: ChangeEvent<HTMLInputElement, Element>, newValue: number[]) => void` | No |  | Function to be called when value change |
| `onChangeCommitted` | `(event: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element> | TouchEvent<Element>, newValue: number[]) => void` | No |  | Function to be called when value is committed by mouseup event |
| `outputFunction` | `(value: number) => string` | No |  | Function for formatting the displayed value. E.g. formatting dates, or adding a unit suffix |
| `max` | `number` | No | 100 | Max value |
| `min` | `number` | No | 0 | Min value |
| `step` | `number` | No | 1 | Stepping interval |
| `minMaxDots` | `boolean` | No | true | Show the min and max dots or not |
| `minMaxValues` | `boolean` | No | true | Show the min and max values or not |
| `disabled` | `boolean` | No |  | Disabled |
| `hideActiveTrack` | `boolean` | No |  | hides the "active" fill color from the track |
| `labelAlwaysOn` | `boolean` | No | false | Make the current value label always visible, otherwise it only shows on hover/focus or while using touch input |
| `labelBelow` | `boolean` | No | false | Display the value label below the track |

## Examples

### Disabled

```tsx
() => <>
    <Slider value={50} disabled aria-label="Disabled Slider" />
    <Slider value={[30, 70]} aria-label="disabled range slider" disabled />
  </>
```

### Hide Active Track

```tsx
() => <>
    <Slider value={4} min={0} max={10} aria-label="hidden active track" hideActiveTrack />
    <Slider value={[30, 70]} aria-label="hidden active track range" hideActiveTrack />
  </>
```

### Introduction

```tsx
args => {
  return <Slider aria-label="simple-slider" {...args} />;
}
```

### Label Always On

```tsx
() => <Slider value={4} min={0} max={10} aria-labelledby="simple-slider" labelAlwaysOn />
```

### Range slider

```tsx
() => {
  const [value, updateValue] = useState([30, 70]);
  const changeHandler = (event: ChangeEvent<HTMLInputElement>, value: number[]) => {
    updateValue(value);
  };
  return <>
      <Slider value={value} onChange={changeHandler} aria-label="Range slider" />
      <Typography variant="caption">
        Output from slider is {value.join(', ')}
      </Typography>
    </>;
}
```

### Range slider with committed step

```tsx
() => {
  const [value, updateValue] = useState([0, 500]);
  const [valueCommited, updateValueCommited] = useState([0, 500]);
  return <>
      <Slider aria-label="Range slider with a lot of steps" value={value} onChange={(event, value) => {
      updateValue(value);
    }} min={0} max={500} onChangeCommitted={(event, value) => {
      updateValueCommited(value);
    }} />
      <Typography variant="caption">
        Committed output from slider is{' '}
        {valueCommited && valueCommited.join(', ')}
      </Typography>
    </>;
}
```

### Range slider with dates

```tsx
() => {
  const outputFunction = (value: number) => {
    const date = new Date(value);
    return date.toLocaleDateString('nb-NO', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  };
  const getUnixTime = (iso: string | number | Date) => {
    return new Date(iso).getTime();
  };
  return <Slider min={getUnixTime('2020-01-01')} max={getUnixTime('2020-01-31')} step={60 * 60 * 24 * 1000} value={[getUnixTime('2020-01-01'), getUnixTime('2020-01-31')]} outputFunction={outputFunction} aria-label="Range slider with dates" />;
}
```

### Range slider with interval

```tsx
() => <>
    <Label label="Range slider with steps of 5" id="large-step-range-slider" />
    <Slider aria-labelledby="large-step-range-slider" step={5} min={30} minMaxDots={false} value={[40, 60]} />
  </>
```

### Simple slider

```tsx
() => <>
    <Label label="Slide me" id="simple-slider" />
    <Slider value={4} min={0} max={10} aria-labelledby="simple-slider" />
  </>
```

### Simple slider with steps

```tsx
() => <>
    <Label label=" Simple slider, no dots, no min or max values, steps of 10" id="even-simpler-slider" />
    <Slider aria-labelledby="even-simpler-slider" value={50} step={10} minMaxDots={false} minMaxValues={false} />
  </>
```

### Slider Stack

```tsx
() => <div style={{
  width: '100%'
}}>
    <StyledLabel label="Its a range slider" id="below-1" />
    <StyledSlider aria-labelledby="below-1" min={30} value={[40, 60]} labelBelow labelAlwaysOn />
    <StyledLabel label="Another range slider" id="below-2" />
    <StyledSlider aria-labelledby="below-2" min={30} value={[30, 70]} labelBelow labelAlwaysOn />
    <StyledLabel label="Slider" id="below-3" />
    <StyledSlider aria-labelledby="below-3" min={0} value={[35]} labelBelow labelAlwaysOn />
  </div>
```

### T
