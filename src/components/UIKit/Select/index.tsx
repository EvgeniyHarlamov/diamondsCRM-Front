import { useEffect, useRef, useState } from "react";
import { defaultDropdownState } from "../../../constants";
import ReactSelect from 'react-select'
import { DropdownItem } from "../../../types";
import { MultiValueGeneric } from "react-select/src/components/MultiValue";

type PropsT = {
    options: Array<DropdownItem> | undefined,
    placeholder: string | React.ReactNode
    label?: string
    className?: string
    defaultValue?: string
    onChange?: (event: any) => void
    disabled?: boolean
    searchable?: true
}

function Select({options, placeholder, label, className, defaultValue, onChange, disabled=false, searchable}:PropsT) {
    const [placeholderState, setPlaceholderState] = useState(placeholder)
    const placesStyle =
    {
        container: (provided:any, state:any) => ({
            ...provided,
            cursor: 'pointer',
        }),
        indicatorSeparator: () => ({
        }),
        dropdownIndicator: () => ({
            color: 'rgba(24, 48, 50, 0.5)',
            paddingRight: '11px'
        }),
        option: (provided:any, state:any) => ({
            ...provided,
            color: '#2E3E3F',
            backgroundColor: '#FFFFFF',
            padding: '0.25rem 1.5rem',
            cursor: 'pointer'
        }),
          valueContainer: (provided:any, state:any) => ({
            ...provided,
            padding: '2px 8px 2px 16px'
        }),
        control: (state: any) => ({
            // ...provided,
            display: 'flex',
            justifyContent: 'space-between',
            border: '1px solid transparent',
            backgroundColor: '#F0F4F5',
            height: '48px',
            borderRadius: '4px',
            outline: '0',
            // padding: '1rem'
        }),
        placeholder: () => ({
            color: 'rgba(24, 48, 50, 0.5)',
            // paddingLeft: '16px'
        }),
        singleValue: (provided:any, state:any) => {
            // const transition = 'opacity 300ms';
            const color = "black";
            return {
                    ...provided,
                    // transition,
                    color
                };
        },
    }



    return(
        defaultValue ?
            <div className={className ? className : ''}>
                {label && <div className={'label'}>{label}</div>}
                <ReactSelect
                    defaultValue={{
                        value: defaultValue,
                        label: defaultValue
                    }}
                    placeholder={<div>{placeholderState}</div>}
                    styles={placesStyle}
                    options={options ? options.sort(function(a, b) {
                                if(a.label < b.label) { return -1; }
                                if(a.label > b.label) { return 1; }
                                return 0;
                    }) : options}

                    onFocus={() => setPlaceholderState('')}
                    isSearchable={searchable ? true : false}
                    onChange={(event) => {
                        if (onChange) onChange(event)
                    }}
                    isDisabled={disabled}
                />
            </div>
        :
            <div className={className ? className : ''}>
            {label && <div className={'label'}>{label}</div>}
            <ReactSelect
                placeholder={<div>{placeholderState}</div>}
                styles={placesStyle}
                options={options ? options.sort(function(a, b) {
                    if(a.label < b.label) { return -1; }
                    if(a.label > b.label) { return 1; }
                    return 0;
                }) : options}
                onFocus={() => setPlaceholderState('')}
                onBlur={() => setPlaceholderState(placeholder)}
                isSearchable={searchable ? true : false}
                onChange={(event) => {
                    if (onChange) onChange(event)
                }}
                isDisabled={disabled}
            />
    </div>
    );
}

export default Select;