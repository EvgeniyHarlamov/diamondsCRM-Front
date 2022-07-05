import React, { useEffect, useState } from 'react';
import Select from '../Select';
import UncontrolledDropdown from '../UncontrolledDropdown';
import styles from './styles.module.scss';
import ReactSelect from 'react-select';
import { DropdownItem } from '../../../types';



type PropsT = {
    defaultService: 'paid' | 'vip' | 'pay' | 'free',
    onChange: (value: string) => void
}

function ServiceStatusDropdown({defaultService, onChange = () => {}}:PropsT) {
    const handleValue = (value: string) => {
        if (value === 'free') return 'Бесплатно ';
        if (value === 'paid') return 'Оплачено';
        if (value === 'pay') return 'На оплате ';
        if (value === 'vip') return 'VIP ';
    }

    const options:any= [
        {
            value: 'paid',
            label: 'Оплачено'
        },
        {
            value: 'vip',
            label: 'VIP'
        },
        {
            value: 'pay',
            label: 'На оплате'
        },
        {
            value: 'free',
            label: 'Бесплатно'
        },
    ];

    const defaultStyle =
    {
        container: (provided:any, state:any) => ({
            ...provided,
            cursor: 'pointer',
            borderRadius: '96px',
            minWidth: '140px',
        }),
        indicatorSeparator: () => ({
        }),
        dropdownIndicator: () => ({
            color: '#FFFFFF',
            paddingRight: '11px'
        }),
        option: (provided:any, state:any) => ({
          ...provided,
        //   color: '#FFFFFF',
          padding: '0.25rem 1.5rem'

        }),
        control: () => ({
            // ...provided,
            display: 'flex',
            justifyContent: 'space-between',
            border: '1px solid transparent',
            backgroundColor: '#5BAE4E',
            borderRadius: '96px',
            outline: '0',
        }),
        placeholder: () => ({
            color: 'rgba(24, 48, 50, 0.5)',
            // paddingLeft: '16px'
        }),
        singleValue: (provided:any, state:any) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
          return {
            ...provided,
            opacity,
            transition,
            color: '#FFFFFF',
            };
        },
    }

    const paidStyle =
    {
        ...defaultStyle,
        valueContainer: (provided:any, state:any) => ({
            ...provided,
            backgroundColor: '#5BAE4E',
            padding: '5px 12px 5px 16px',
            borderRadius: '96px',
            display: 'flex',
            justifyContent: 'center'
        }),
        control: () => ({
            // ...provided,
            display: 'flex',
            justifyContent: 'space-between',
            border: '1px solid transparent',
            backgroundColor: '#5BAE4E',
            height: '32px',
            borderRadius: '96px',
            outline: '0',
            // padding: '1rem'
        }),
    }

    const vipStyle =
    {
        ...defaultStyle,
        valueContainer: (provided:any, state:any) => ({
            ...provided,
            backgroundColor: '#EC9A29',
            padding: '2px 8px 2px 16px',
            borderRadius: '96px',
            display: 'flex',
            justifyContent: 'center'
        }),
        control: () => ({
            // ...provided,
            display: 'flex',
            justifyContent: 'space-between',
            border: '1px solid transparent',
            backgroundColor: '#EC9A29',
            height: '32px',
            borderRadius: '96px',
            outline: '0',
            // padding: '1rem'
        }),
    }

    const onPayStyle =
    {
        ...defaultStyle,
        valueContainer: (provided:any, state:any) => ({
            ...provided,
            backgroundColor: '#528DD2',
            padding: '2px 8px 2px 16px',
            borderRadius: '96px',
            display: 'flex',
            justifyContent: 'center'
        }),
        control: () => ({
            // ...provided,
            display: 'flex',
            justifyContent: 'space-between',
            border: '1px solid transparent',
            backgroundColor: '#528DD2',
            height: '32px',
            borderRadius: '96px',
            outline: '0',
            // padding: '1rem'
        }),
    }

    const freeStyle =
    {
        ...defaultStyle,
        valueContainer: (provided:any, state:any) => ({
            ...provided,
            backgroundColor: '#F0F4F5',
            padding: '2px 8px 2px 16px',
            borderRadius: '96px',
            display: 'flex',
            justifyContent: 'center'
        }),
        dropdownIndicator: () => ({
            color: 'rgba(24, 48, 50, 0.5)',
            paddingRight: '11px'
        }),
        control: () => ({
            // ...provided,
            display: 'flex',
            justifyContent: 'space-between',
            border: '1px solid transparent',
            backgroundColor: '#F0F4F5',
            height: '32px',
            borderRadius: '96px',
            outline: '0',
            // padding: '1rem'
        }),
        singleValue: (provided:any, state:any) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
            return {
              ...provided,
              opacity,
              transition,
              color: 'rgba(24, 48, 50, 0.5)'
              };
          },
    }

    const defaultValue = {
        label: handleValue(defaultService),
        value: defaultService
    };

    const [colorStyle, setColorStyle] = useState(paidStyle);
    const [value, setValue] = useState<any>(defaultValue.value);

    useEffect(() => {
        if (value === 'paid') setColorStyle(paidStyle);
        if (value === 'vip') setColorStyle(vipStyle);
        if (value === 'pay') setColorStyle(onPayStyle);
        if (value === 'free') setColorStyle(freeStyle);
    }, [value]);

    return(
        <ReactSelect
            defaultValue={defaultValue}
            styles={colorStyle}
            options={options}
            isSearchable={false}
            onChange={(event) => {
                if (event) {
                    setValue(event.value);
                    onChange(event.value);
                }
            }}
        />
    );
}



export default ServiceStatusDropdown;