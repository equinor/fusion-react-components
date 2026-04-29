[📝  Documentation](https://eds.equinor.com/0b0c666ab/p/07b531-datetime-picker/b/86826a)[@equinor/eds-core-react](https://www.npmjs.com/package/@equinor/eds-core-react)[Github](https://github.com/equinor/design-system/blob/develop/packages/eds-core-react/src/components/Datepicker/DatePicker.tsx)

# DatePicker

Datepicker for selecting a single date, built on [react-aria](https://react-spectrum.adobe.com/react-aria)'s date/time hooks.

mm

/

dd

/

yyyy

 

| Name | Description | Default | Control |
| --- | --- | --- | --- |
| variant | 
The variant / state of the datepicker field

"error""warning""success"

 | - | 

varianterrorwarningsuccess

 |
| disabled | 

Whether the datepicker field is disabled

boolean

 | 

false

 |  |
| readOnly | 

boolean

 | - |  |
| helperProps | 

Props to set the helper text

HelperTextProps

 | - |  |
| value | 

Controlled value

Date

 | - |  |
| onChange | 

The function to call when the datepicker field value changes

(date: Date) => void

 | - | - |
| label | 

The field label

string

 | - |  |
| minValue | 

minValue sets a limit to how far back the datepicker allows you to go note: this does not prevent you from typing in a date that is before the minValue

Date

 | - |  |
| maxValue | 

maxValue sets a limit to how far back the datepicker allows you to go note: this does not prevent you from typing in a date that is after the maxValue

Date

 | - |  |
| isDateUnavailable | 

isDateUnavailable is used to disable specific dates (e.g. weekends)

(v: Date) => boolean

 | - | - |
| Footer | 

An optional footer to display below the calendar, useful for e.g. presets

(props: HeaderFooterProps<CalendarState>) => ReactNode

 | - | - |
| Header | 

An optional header to display above the calendar, can be used to override the default The component is fed with enough props to be able to control the calendar-view

(props: HeaderFooterProps<CalendarState>) => ReactNode

 | - | - |
| showTimeInput | 

Whether to allow picking the time as well as the date

boolean

 | - |  |
| hideClearButton | 

hide the clear button even when date is set

boolean

 | 

false

 |  |
| timezone | 

Timezone to use for the datepicker

string

 | - |  |
| granularity | 

Granularity of the time field if enabled

"hour""minute""second"

 | - | 

granularityhourminutesecond

 |
| formatOptions | 

Format options for the datepicker input field Only applies when input is blurred

DateFormatterOptions

 | - |  |
| locale | 

The locale to use for formatting the date. Defaults to browser's language setting

string

 | - |  |

## Usage

### Custom display format

In some cases it's useful to display the date in a different format than the default. This can be done by passing a `formatOptions` prop, which uses the [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) options.

For example, to display the date as `dd MMMM yyyy`:

April

/

29

/

2026

 

### Custom locale

In some cases it's useful to display the date in a different locale than the default, e.g. if your app has a locale-picker. Currently the locale is selected on a priority basis:

-   The locale passed to the DatePicker component as a prop: `<DatePicker locale="en-US" />`
-   The locale defined in react-aria's `I18nProvider`:

-   The locale resolved from your system setup (`Intl.DateTimeFormat().resolvedOptions().locale`)

 

### Min / Max values

Limits on min/max can be set to restrict the dates that can be selected. In this example, it's set as the current month excluding first/last date

 

### Disable specific days

In this example, we disable saturday + sunday

 

 

### Custom header / footer
