import React, { useEffect, useRef, useState } from "react";
import { defaultDropdownState, domain } from "../../../constants";
import AsyncReactSelect from 'react-select/async';
import {components } from 'react-select';
import { DropdownItem } from "../../../types";
import formatEmployeesToInChargeList from "../../../utils/format/formatEmployeesToInChargeList";
import Loader from "react-loader-spinner";

type PropsT = {
    options?: Array<DropdownItem>,
    placeholder: string | React.ReactNode
    label?: string
    className?: string
    defaultValue?: string
    onChange?: (event: any) => void
    disabled?: true
    searchable?: true
    loadingOptions: any
}

function AsyncSelect
({placeholder, label, className, defaultValue, onChange, disabled, searchable, loadingOptions}:PropsT) {

    const [placeholderState, setPlaceholderState] = useState(placeholder);
    const [inputValueState, setInputValueState] = useState('');
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
            padding: '2px 8px 2px 16px',
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
            const transition = 'opacity 300ms';
            const color = "black";
            return {
                    ...provided,
                    transition,
                    color
                };
        },
        noOptionsMessage: (provided:any) => ({ ...provided }),
        LoadingIndicator: (provided:any) => ({ ...provided, color: 'grey' })
    }



    const LoadingIndicator = (props:any) => {
        return (
            <Loader
                type="Rings"
                color="#DCE5E6"
                height={50}
                width={50}
                timeout={3000} //3 secs
            />);
    };

    const NoOptionsMessage = (props:any) => {
        return (
            <div>
                <components.NoOptionsMessage {...props}>
                    Начните вводить...
                </components.NoOptionsMessage>
            </div>
        );
      };


    return(
        defaultValue ?
            <div className={className ? className : ''}>
                {label && <div className={'label'}>{label}</div>}
                <AsyncReactSelect
                    defaultValue={{
                        value: defaultValue,
                        label: defaultValue
                    }}
                    placeholder={placeholder}
                    isClearable={true}
                    styles={placesStyle}
                    // onFocus={() =>  {
                    //     // setPlaceholderState('')
                    //     // setInputValueState('');
                    // }}
                    // onBlur={() => {
                    //     // setPlaceholderState('')
                    //     // setInputValueState('');
                    // }}
                    isSearchable={searchable ? true : false}
                    onChange={(event, triggeredAction) => {
                        if (onChange && event) onChange(event)
                        if (onChange && triggeredAction.action === 'clear') {
                            onChange('')
                        }
                        // if (event) setInputValueState(event.value);
                    }}
                    onInputChange={setInputValueState}
                    // onInputChange={(query, { action }) => {
                //     if (action !== "set-value") setInputValueState(query);
                    // }}
                    // inputValue={inputValueState}
                    // value={inputValueState !== '' ?
                    //     {
                    //         value: inputValueState,
                    //         label: inputValueState
                    //     }
                    //         :
                    //     null
                    // }
                    NoOptionsMessage = {'Начните ввод...'}
                    isDisabled={disabled}
                    cacheOptions
                    defaultOptions
                    components={{ NoOptionsMessage, LoadingIndicator }}
                    loadOptions={loadingOptions}
                />
            </div>
        :
            <div className={className ? className : ''}>
            {label && <div className={'label'}>{label}</div>}
            <AsyncReactSelect
                placeholder={placeholder}
                isClearable={true}
                styles={placesStyle}
                // onFocus={() =>  {
                //     // setPlaceholderState('')
                //     // setInputValueState('');
                // }}
                // onBlur={() => {
                //     // setPlaceholderState('')
                //     // setInputValueState('');
                // }}
                isSearchable={searchable ? true : false}
                onChange={(event, triggeredAction) => {
                    if (onChange && event) onChange(event)
                    if (onChange && triggeredAction.action === 'clear') {
                        onChange('')
                      }
                    // if (event) setInputValueState(event.value);
                }}
                onInputChange={setInputValueState}
                // onInputChange={(query, { action }) => {
               //     if (action !== "set-value") setInputValueState(query);
                // }}
                // inputValue={inputValueState}
                // value={inputValueState !== '' ?
                //     {
                //         value: inputValueState,
                //         label: inputValueState
                //     }
                //         :
                //     null
                // }
                NoOptionsMessage = {'Начните ввод...'}
                isDisabled={disabled}
                cacheOptions
                defaultOptions
                components={{ NoOptionsMessage, LoadingIndicator }}
                loadOptions={loadingOptions}
            />
    </div>
    );
}

export default AsyncSelect;