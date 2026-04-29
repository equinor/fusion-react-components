# Inputs/Autocomplete

> **Package:** `@equinor/eds-core-react` — `import { Autocomplete } from '@equinor/eds-core-react'`

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `options` | `readonly T[]` | Yes |  | List of options in dropdown |
| `totalOptions` | `number` | No |  | Total number of options |
| `label` | `ReactNode` | Yes |  | Label for the select element |
| `initialSelectedOptions` | `T[]` | No | [] | Array of initial selected items |
| `helperText` | `string` | No |  | Text that will be displayed under the text field |
| `helperIcon` | `ReactNode` | No |  | Icon that will be displayed before the helper text |
| `noOptionsText` | `string` | No | 'No options' | Set text for the "no options" item. Set to an empty string to force off |
| `variant` | `"error" "warning" "success"` | No |  | Variants |
| `meta` | `ReactNode` | No |  | Meta text, for instance unit |
| `disabled` | `boolean` | No | false | Disabled state |
| `loading` | `boolean` | No | false | Set loading state (shows a spinner in the right side of the input field) |
| `readOnly` | `boolean` | No | false | Read Only |
| `hideClearButton` | `boolean` | No | false | Hide clear button even when items are selected |
| `selectedOptions` | `T[]` | No |  | If this prop is used, the select will become a controlled component. Use an empty array [] if there will be no initial selected items. Note that this prop replaces the need for ```initialSelectedOptions``` The items that should be selected. |
| `selectionDisplay` | `"summary" "chips"` | No | 'summary' | How selected items are displayed in the input field |
| `chipCount` | `number` | No | undefined | Amount of values to list in chips (only relevant if selectionDisplay = 'chips') When left blank, all values will be shown as chips |
| `onOptionsChange` | `(changes: AutocompleteChanges<T>) => void` | No |  | Callback for the selected item change changes.selectedItems gives the selected items |
| `onInputChange` | `(text: string) => void` | No |  | Callback for input changes. Returns input value |
| `onAddNewOption` | `(text: string) => void` | No |  | Callback for clicking the add new option button |
| `multiple` | `boolean` | No |  | Enable multiselect |
| `allowSelectAll` | `boolean` | No |  | Add select-all option. Throws an error if true while multiple = false |
| `optionComponent` | `(option: T, isSelected: boolean) => ReactNode` | No |  | Custom option template |
| `optionDisabled` | `(option: T) => boolean` | No | () => false | Disable option |
| `optionsFilter` | `(option: T, inputValue: string) => boolean` | No |  | Custom filter function for options |
| `autoWidth` | `boolean` | No |  | If `true` the width of the dropdown will adjust to the width of the input |
| `placeholder` | `string` | No |  | Descriptive text for whats selected or about to be selected |
| `clearSearchOnChange` | `boolean` | No | true | Toggle if input is cleared when an option is selected when `multiple` is `true` |
| `multiline` | `boolean` | No | false | Will wrap overflowing text at the expence of some performance overhead to calculate item heigths. Mostly relevant in combination with autoWidth |
| `dropdownHeight` | `number` | No | 300 | Override default max height on dropdown (in px) |
| `itemToKey` | `(value: T) => unknown` | No |  | Method that is used to select a key that can be used for comparing items. If omitted, objects are matched by reference. |

| `onClear` | `() => void` | No |  | Callback for clear all button |

| `optionLabel` | `((option: T) => string) | ((option: T) => string) | ((option: T) => string)` | No |  | Custom option label. NOTE: This is required when option is an object |

## Examples

### Add new option

```tsx
() => {
  const [options, setOptions] = useState<MyOptionType[]>([...stocks]);
  const [selectedItems, setSelectedItems] = useState<MyOptionType[]>([]);
  const handleOptionsChange = (changes: AutocompleteChanges<MyOptionType>) => {
    setSelectedItems(changes.selectedItems);
  };
  const handleAddNewOption = (newOption: string) => {
    // Create a new object with the input as company name
    const newStock: MyOptionType = {
      label: newOption,
      symbol: newOption.substring(0, 4).toUpperCase(),
      trend: ''
    };

    // Add the new option to the list if it doesn't already exist
    if (!options.some(opt => opt.label.toLowerCase() === newOption.toLowerCase())) {
      setOptions(prev => [...prev, newStock]);
      // Also add it to selected items
      setSelectedItems(prev => [...prev, newStock]);
      action('onAddNewOption')(newOption);
    }
  };
  return <>
      <Typography style={{
      marginBottom: '1rem'
    }}>
        Type a company name that{"'"}s not in the list and press Enter or click
        the {'"Add"'} option to add it as a new stock.
      </Typography>

      <Autocomplete label="Select or add stocks" options={options} multiple placeholder="Type to search or add new stocks..." selectedOptions={selectedItems} onOptionsChange={handleOptionsChange} onAddNewOption={handleAddNewOption} optionLabel={optionLabel} />

      {selectedItems.length > 0 && <div style={{
      marginTop: '1rem'
    }}>
          <Typography variant="body_short" style={{
        marginBottom: '0.5rem'
      }}>
            Selected stocks:
          </Typography>
          <div style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
            {selectedItems.map(stock => <Chip key={stock.label} onDelete={() => setSelectedItems(prev => prev.filter(item => item.label !== stock.label))}>
                {stock.trend} {stock.label} ({stock.symbol})
              </Chip>)}
          </div>
        </div>}
    </>;
}
```

### Async search autocomplete

```tsx
() => {
  type CountryName = {
    common: string;
    official: string;
  };
  type Flag = {
    png: string;
    svg: string;
    alt: string;
  };
  type Country = {
    name: CountryName;
    population: number;
    capital: string[];
    flags: Flag;
  };
  const [options, setOptions] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Country>();
  const [searchInput, setSearchInput] = useState<string>('');
  const debounce = useRef<ReturnType<typeof setTimeout>>(null);
  const onChange = (changes: AutocompleteChanges<Country>) => {
    setSelectedItem(changes.selectedItems[0]);
  };
  function CustomItem(option: Country) {
    const {
      name: {
        common,
        official
      },
      flags: {
        svg
      }
    } = option;
    return <div style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      paddingBlock: '4px'
    }}>
        <img src={svg} style={{
        width: '100px'
      }} alt={`flag of ${common}`} />
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
      }}>
          <Typography group="paragraph" variant="body_long_bold">
            {official}
          </Typography>
          <Typography group="paragraph" variant="caption">
            {common}
          </Typography>
        </div>
      </div>;
  }
  useEffect(() => {
    if (searchInput.length < 2) return setOptions([]);
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch(`https://restcountries.com/v3.1/name/${searchInput}`, {
      signal
    }).then(r => {
      if (!r.ok) {
        throw Error(r.statusText);
      }
      return r.json();
    }).then((countries: Country[]) => {
      countries && setOptions(countries);
      setLoading(false);
    }).catch((err: Error) => {
      console.warn(`Warning: ${err.message}`);
      setOptions([]);
      setLoading(false);
    });
    return () => {
      abortController.abort();
    };
  }, [searchInput]);
  useEffect(() => {
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, []);
  const search = (input: string) => {
    if (input.length < 2) return setSearchInput('');
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      setSearchInput(input);
    }, 400);
  };
  return <>
      <Autocomplete label="Search countries" onInputChange={search} options={options} optionsFilter={() => true} optionLabel={opt => `${opt.name.common}`} optionComponent={CustomItem} onOptionsChange={onChange} selectedOptions={[selectedItem]} loading={loading} noOptionsText={loading ? 'Loading data..' : 'No options'} multiline />
      {selectedItem && <Card elevation="raised" style={{
      overflow: 'hidden'
    }}>
          <CountryTemplate>
            <img src={selectedItem.flags.svg} alt={selectedItem.flags.alt} />
            <div style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column'
        }}>
              <Typography variant="h2" style={{
            fontWeight: '600'
          }}>
                {selectedItem.name.official}
              </Typography>
              <div style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
                <div>
                  <Typography variant="body_short">CAPITAL</Typography>
                  <Typography variant="h3" as="p" style={{
                fontWeight: '500'
              }}>
                    {selectedItem.capital ? selectedItem.capital[0] : 'N/A'}
                  </Typography>
                </div>
                <div>
                  <Typography variant="body_short">POPULATION</Typography>
                  <Typography variant="h3" as="p" style={{
                fontWeight: '500'
              }}>
                    {new Intl.NumberFormat().format(selectedItem.population)}
                  </Typography>
                </div>
              </div>
              <Typography variant="body_short_italic">
                source:{' '}
                <Typography link href="https://restcountries.com/" target="_blank">
                  restcountries.com
                </Typography>
              </Typography>
            </div>
          </CountryTemplate>
        </Card>}
    </>;
}
```

### Adjusting dropdown width

```tsx
args => {
  const {
    options
  } = args;
  return <>
      <Autocomplete optionLabel={opt => `${opt.trend} ${opt.label}`} label="Select a stock" options={options} autoWidth />
      <Autocomplete optionLabel={optionLabel} label="Select multiple stocks" options={options} multiple autoWidth multiline />
    </>;
}
```

### Compact

```tsx
args => {
  const {
    options,
    optionLabel
  } = args;
  const [compact, setComfortable] = useState<boolean>(true);
  return <EdsProvider density={compact ? 'compact' : 'comfortable'}>
      <Checkbox label="Compact" onChange={() => {
      setComfortable(!compact);
    }} checked={compact} />
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginTop: '16px',
      width: '300px'
    }}>
        <Autocomplete label="Single select" initialSelectedOptions={[options[0]]} options={options} optionLabel={optionLabel} />
        <Autocomplete label="Multiple (summary)" multiple initialSelectedOptions={[options[0], options[1]]} options={options} optionLabel={optionLabel} />
        <Autocomplete label="Multiple (chips)" multiple selectionDisplay="chips" initialSelectedOptions={[options[0], options[1]]} options={options} optionLabel={optionLabel} />
      </div>
    </EdsProvider>;
}
```

### Controlled

```tsx
args => {
  const {
    options
  } = args;
  const [selectedItems, setSelectedItems] = useState<string[]>(['Vestland', 'Viken']);
  const onChange = (changes: AutocompleteChanges<string>) => {
    setSelectedItems(changes.selectedItems);
  };
  return <>
      <Typography>
        Your selected items:{' '}
        {selectedItems.map((x, index) => `${x}${index < selectedItems.length - 1 ? ', ' : ''}`)}
      </Typography>
      <Autocomplete label="Select counties" options={options} onOptionsChange={onChange} selectedOptions={selectedItems} multiple />
    </>;
}
```

### Controlled Single Select

```tsx
() => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ['option 1', 'option 2', 'option 3', 'option 4'];
  const isOptionDisabled = (item: string) => item === 'option 3';
  return <div>
      <Autocomplete label="test" options={options} selectedOptions={selectedOptions} onOptionsChange={({
      selectedItems: options
    }) => setSelectedOptions(options)} optionDisabled={isOptionDisabled} />
      <Button onClick={() => {
      setSelectedOptions([options.filter(option => !selectedOptions.includes(option))[Math.floor(Math.random() * (options.length - 1))]]);
    }}>
        Change to random other option
      </Button>
      <Typography>Selected option is: {selectedOptions[0]}</Typography>
    </div>;
}
```

### Custom options filter

```tsx
args => {
  const {
    options,
    optionLabel
  } = args;
  const optionsFilter: AutocompleteProps<MyOptionType>['optionsFilter'] = (option, inputValue) => (option.label + option.symbol).toLowerCase().includes(inputValue.toLocaleLowerCase());
  return <div style={{
    width: '300px'
  }}>
      <Autocomplete label="Select stocks" placeholder="Try searching for MSFT" options={options} optionLabel={optionLabel} optionsFilter={optionsFilter} multiple />
    </div>;
}
```

### Disabled

```tsx
args => {
  const {
    options,
    optionLabel
  } = args;
  return <>
      <Autocomplete label="Select a stock" options={options} optionLabel={optionLabel} disabled />
    </>;
}
```

### Disabled option

```tsx
args => {
  const {
    options,
    optionLabel
  } = args;
  const [filter, setFilter] = useState<boolean>(true);
  const isOptionDisabled = (item: MyOptionType) => item?.trend === '📉';
  return <>
      <Checkbox label="disable options" onChange={() => {
      setFilter(!filter);
    }} checked={filter} />
      <Autocomplete label="Select a stock" options={options} optionDisabled={filter ? isOptionDisabled : undefined} optionLabel={optionLabel} multiple allowSelectAll />
    </>;
}
```

### Introduction

```tsx
args => {
  return <Autocomplete {...args} />;
}
```

### Large Datasets

```tsx
args => {
  const {
    options
  } = args;
  const [selectedItems, setSelectedItems] = useState<MyOptionType[]>([]);
  const handleChange = (changes: AutocompleteChanges<MyOptionType>) => {
    setSelectedItems(changes.selectedItems);
  };
  return <>
      <Typography style={{
      marginBottom: '1rem'
    }}>
        This example simulates an API that returns 13 stocks from a total of
        1,500 available stocks. Notice how the selection counter shows
        {' "x/1,500 selected" '}
        instead of {'"x/13 selected"'}.
      </Typography>
      <Autocomplete label="Select from paginated stock results" options={options} multiple placeholder="Search and select stocks" totalOptions={1500} // Total available options from API
    selectedOptions={selectedItems} onOptionsChange={handleChange} optionLabel={optionLabel} />
    </>;
}
```

### Multiple

```tsx
args => {
  const {
    options
  } = args;
  return <Autocomplete label="Select multiple stocks" options={options} multiple placeholder="Select your stocks" optionLabel={optionLabel} />;
}
```

### Customized option component

```tsx
args => {
  const {
    options
  } = args;
  function CustomItem(option: MyOptionType, isSelected: boolean) {
    const {
      label,
      symbol
    } = option;
    const outlineColor = isSelected ? '#007079' : 'transparent';
    return <div style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      paddingBlock: '4px'
    }}>
        <Avatar src={`https://i.pravatar.cc/48?u=${symbol}`} size={48} alt="profile" style={{
        border: `5px solid transparent`,
        outline: `3px solid ${outlineColor}`,
        outlineOffset: '-3px'
      }} />
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
      }}>
          <Typography group="paragraph" variant="body_long_bold">
            {label}
          </Typography>
          <Typography group="paragraph" variant="caption">
            {symbol}
          </Typography>
        </div>
      </div>;
  }
  return <>
      <Autocomplete label="Select a stock" options={options} optionLabel={opt => `${opt.trend} ${opt.label} (${opt.symbol})`} optionComponent={CustomItem} initialSelectedOptions={[JSON.parse(JSON.stringify(options[1]))] as MyOptionType[]} itemToKey={item => {
      return item.label;
    }} multiline />
      <Autocomplete label="Select multiple stocks" options={options} optionLabel={opt => `${opt.trend} ${opt.label} (${opt.symbol})`} optionComponent={CustomItem} initialSelectedOptions={JSON.parse(JSON.stringify([options[1], options[2]])) as MyOptionType[]} itemToKey={item => {
      return item.label;
    }} multiline multiple />
    </>;
}
```

### Objects as options

```tsx
args => {
  const {
    options
  } = args;
  return <>
      <Autocomplete label="Select a stock" options={options} optionLabel={opt => `${opt.trend} ${opt.label} (${opt.symbol})`} initialSelectedOptions={[options[1]]} />
    </>;
}
```

### Preselected options

```tsx
args => {
  const {
    options,
    optionLabel
  } = args;
  return <>
      <Autocomplete label="Select multiple stocks" initialSelectedOptions={[options[0], options[1], options[5]]} options={options} optionLabel={optionLabel} multiple />
    </>;
}
```

### Read only

```tsx
args => {
  const {
    options,
    optionLabel
  } = args;
  return <>
      <Autocomplete label="Select a stock" options={options} optionLabel={optionLabel} initialSelectedOptions={[options[3]]} readOnly />
    </>;
}
```

### Select all

```tsx
args => {
  const {
    options
  } = args;
  const [selectedItems, setSelectedItems] = useState<MyOptionType[]>([]);
  const onDelete = (itemLabel: string) => setSelectedItems(selectedItems.filter(x => !(x.label === itemLabel)));
  const onChange = (e: AutocompleteChanges<MyOptionType>) => {
    action('optionsChange')(e);
    setSelectedItems(e.selectedItems);
  };
  return <>
      <Autocomplete label="Select stocks" options={options} selectedOptions={selectedItems} allowSelectAll={true} onOptionsChange={onChange} placeholder={`${selectedItems.length}/ ${options.length} selected`} multiple optionLabel={optionLabel} />
      <div style={{
      display: 'grid',
      gap: '16px',
      gridTemplateColumns: 'repeat(4, auto)'
    }}>
        {selectedItems.map(x => <Chip key={x.label} onDelete={() => onDelete(x.label)}>
            {x.label}
          </Chip>)}
      </div>
    </>;
}
```

### Selection display

```tsx
args => {
  const {
    options,
    chipCount
  } = args;
  return <>
      <Autocomplete label="Summary display (default)" options={options} multiple placeholder="Select stocks" optionLabel={optionLabel} selectionDisplay="summary" initialSelectedOptions={[options[0], options[1]]} />
      <Autocomplete label="Chips display" options={options} multiple placeholder="Select stocks" optionLabel={optionLabel} chipCount={chipCount} selectionDisplay="chips" initialSelectedOptions={[options[0], options[1]]} />
    </>;
}
```

### Variants

```tsx
args => {
  return <>
      <Autocomplete {...args} helperText="This field cannot be empty" helperIcon={<Icon name="error_filled" title="Error" size={16} />} variant="error" />
      <Autocomplete {...args} helperText="Should be something else" helperIcon={<Icon name="warning_filled" title="Warning" size={16} />} variant="warning" />
      <Autocomplete {...args} helperText="This field is correctly filled" helperIcon={<Icon name="thumbs_up" title="Success" size={16} />} variant="success" />
    </>;
}
```

### Virtualized

```tsx
() => {
  type LoadingState = 'notLoaded' | 'loading' | 'loaded';
  type Photo = {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  };
  const [data, setData] = useState<Array<string>>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('notLoaded');
  const initialize = () => {
    if (loadingState === 'notLoaded') setLoadingState('loading');
  };
  useEffect(() => {
    if (loadingState !== 'loading') return;
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch(`https://jsonplaceholder.typicode.com/photos`, {
      signal
    }).then(r => r.json()).then((d: Photo[]) => {
      const parsed = d.map(x => x.title.substring(0, 30));
      setData(parsed);
      setLoadingState('loaded');
    }).catch((err: Error) => {
      console.warn(`Warning: ${err.message}`);
      setLoadingState('notLoaded');
    });
    return () => {
      abortController.abort();
    };
  }, [loadingState]);
  return <>
      <Autocomplete label={loadingState === 'loaded' ? 'Select multiple items' : 'Focus the input to load data'} loading={loadingState === 'loading'} options={data} multiple clearSearchOnChange={false} onFocus={initialize} />
    </>;
}
```

### With React Hook Form

```tsx
() => {
  const defaultValues: MyFormValues = {
    firstName: null,
    origin: null,
    favouriteCounty: null,
    fruits: []
  };
  const {
    handleSubmit,
    formState: {
      errors
    },
    control,
    reset,
    watch
  } = useForm<MyFormValues>({
    defaultValues
  });
  const [isSubmitted, updateIsSubmitted] = useState(false);
  const [formData, updateFormData] = useState<MyFormValues | null>(null);
  const values = watch();
  return <form onSubmit={handleSubmit((data: MyFormValues) => {
    updateFormData(data);
    updateIsSubmitted(true);
    action('onSubmit')(data);
  })} style={{
    maxHeight: '40px'
  }}>
      {isSubmitted ? <>
          <Typography variant="h4" style={{
        marginBottom: '16px'
      }}>
            Submitted data:
          </Typography>
          <Typography>{JSON.stringify(formData, null, 4)}</Typography>
          <Button style={{
        marginTop: '16px'
      }} variant="outlined" onClick={() => {
        updateIsSubmitted(false);
        updateFormData(null);
        reset();
      }}>
            Reset
          </Button>
        </> : <>
          <div style={{
        margin: '16px 0'
      }}>
            <Controller control={control} name="origin" rules={{
          required: true
        }} render={({
          field: {
            onChange,
            ref
          }
        }) => <Autocomplete onOptionsChange={({
          selectedItems
        }) => {
          console.log('selected origin', selectedItems);
          const [selectedItem] = selectedItems;
          onChange(selectedItem);
        }} selectedOptions={[values.origin]} label="Where are you from?" ref={ref} options={counties} aria-invalid={errors.origin ? 'true' : 'false'} aria-describedby="error-county-required" aria-required autoWidth />} />
            {errors.origin && errors.origin.type === 'required' && <FormError id="error-county-required">
                This field is required
              </FormError>}
          </div>
          <div style={{
        margin: '16px 0'
      }}>
            <Controller control={control} name="favouriteCounty" rules={{
          required: true
        }} render={({
          field: {
            onChange,
            ref
          }
        }) => <Autocomplete ref={ref} onOptionsChange={({
          selectedItems
        }) => {
          const [selectedItem] = selectedItems;
          onChange(selectedItem);
        }} selectedOptions={[values.favouriteCounty]} label="Choose your favourite county" options={counties} autoWidth />} />
            {errors.favouriteCounty && errors.favouriteCounty.type === 'required' && <FormError id="error-county-required">
                  This field is required
                </FormError>}
          </div>
          <div style={{
        margin: '16px 0'
      }}>
            <Controller control={control} name="fruits" render={({
          field: {
            onChange
          }
        }) => <Autocomplete onOptionsChange={({
          selectedItems
        }) => {
          onChange(selectedItems);
        }} selectedOptions={values.fruits} label="Pick at least two fruits" options={[{
          label: 'Banana',
          emoji: '🍌'
        }, {
          label: 'Apple',
          emoji: '🍎'
        }, {
          label: 'Grapes',
          emoji: '🍇'
        }, {
          label: 'Kiwi',
          emoji: '🥝'
        }, {
          label: 'Pineapple',
          emoji: '🍍'
        }]} optionLabel={opt => `${opt?.emoji} ${opt?.label}`} multiple autoWidth />} />
          </div>
          <div style={{
        display: 'flex',
        gap: '16px'
      }}>
            <Button type="submit">I have made my decisions!</Button>
            <Button variant="outlined" onClick={() => reset()}>
              Reset
            </Button>
          </div>
        </>}
    </form>;
}
```

### T
