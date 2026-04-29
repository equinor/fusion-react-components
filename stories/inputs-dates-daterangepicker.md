# Inputs/Dates/DateRangePicker

> **Package:** `@equinor/eds-core-react` — `import { DateRangePicker } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `disabled` | `boolean` | No | false | Whether the datepicker field is disabled |

| `label` | `string` | No |  | The field label |
| `variant` | `"error" "warning" "success"` | No | undefined | The variant / state of the datepicker field |
| `helperProps` | `HelperTextProps` | No |  | Props to set the helper text |
| `minValue` | `Date` | No | undefined | minValue sets a limit to how far back the datepicker allows you to go note: this does not prevent you from typing in a date that is before the minValue |
| `maxValue` | `Date` | No | undefined | maxValue sets a limit to how far back the datepicker allows you to go note: this does not prevent you from typing in a date that is after the maxValue |
| `isDateUnavailable` | `(v: Date) => boolean` | No |  | isDateUnavailable is used to disable specific dates (e.g. weekends) |
| `Footer` | `((props: HeaderFooterProps<CalendarState>) => ReactNode) & ((props: HeaderFooterProps<RangeCalendarState<DateValue>>) => ReactNode)` | No |  | An optional footer to display below the calendar, useful for e.g. presets |
| `Header` | `((props: HeaderFooterProps<CalendarState>) => ReactNode) & ((props: HeaderFooterProps<RangeCalendarState<DateValue>>) => ReactNode)` | No |  | An optional header to display above the calendar, can be used to override the default The component is fed with enough props to be able to control the calendar-view |
| `hideClearButton` | `boolean` | No | false | hide the clear button even when date is set |
| `timezone` | `string` | No |  | Timezone to use for the datepicker |
| `granularity` | `"hour" "minute" "second"` | No |  | Granularity of the time field if enabled |
| `formatOptions` | `DateFormatterOptions` | No |  | Format options for the datepicker input field Only applies when input is blurred |
| `locale` | `string` | No |  | The locale to use for formatting the date. Defaults to browser's language setting |

## Examples

### Introduction

```tsx
args => <PrimaryComponent {...args} />
```

### Limit Specific Days

```tsx
args => {
  const isDateUnavailable = (d: Date) => d.getDay() === 0 || d.getDay() === 6;
  return <DateRangePicker {...args} isDateUnavailable={isDateUnavailable} />;
}
```

### With Min And Max Value

```tsx
args => <DateRangePicker {...args} minValue={min} maxValue={max} />
```

### T
