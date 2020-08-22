# Configurable React + TS Form

### Motivation

It seems like 90% of a frontend developer's life is implementing forms. Forms, forms, forms. They're boring and styling them is a pain. You usually end up with way too much code for something that seems so boilerplate. For this reason, I've been using a configurable typesafe form instead. You provide the styling & layout once via a context hook and BOOM, you can crank out tons of forms throughout your app with just a configuration array. NO STYLING. NO JSX. Of course there are limitiations, but for your standard day-to-day forms, this library should be suitable. 

### Getting started:

##### Yarn
```
 yarn add frr-form frr-web frr-util monocle-ts react styled-components
```

##### NPM
```
 yarn add frr-form frr-web frr-util monocle-ts react styled-components
```

### Example

```ts

import * as React from 'react'
import { Lens } from 'monocle-ts'
import { getTheme, configureTheme } from '../src/theme/theme'

import { FormField, Form } from '../src/components/Form'
import { FormFieldType } from '../src/components/types'

type Person = {
  name: string
  hairColor: string
  age: number
  height: number
  description: string
  email: string
  website: string
}

const mkLens = Lens.fromPath<Person>()

export const personFormFields: Array<FormField<Person, any>> = [
  {
    type: FormFieldType.FormSection,
    title: 'Information',
    fields: [
      [
        {
          label: 'Name',
          type: FormFieldType.TextInput,
          lens: mkLens(['name']),
          required: true,
        },

        {
          label: 'Hair color',
          type: FormFieldType.TextInput,
          lens: mkLens(['hairColor']),
          required: true,
        },
      ],
      [
        {
          label: 'Age',
          type: FormFieldType.TextNumber,
          lens: mkLens(['age']),
          required: true,
        },
        {
          label: 'Height',
          type: FormFieldType.TextNumber,
          lens: mkLens(['height']),
          required: true,
        },
      ],
      [
        {
          label: 'Description',
          type: FormFieldType.TextInput,
          lens: mkLens(['description']),
          required: true,
        },
      ],
      [
        {
          label: 'Email',
          type: FormFieldType.TextInput,
          lens: mkLens(['email']),
          required: true,
        },
        {
          label: 'Website',
          type: FormFieldType.TextInput,
          lens: mkLens(['website']),
          required: true,
        },
      ],
    ],
  },
]

const PersonForm = (props: { person: Person }) => (
  <Form<Person, any>
    formFields={personFormFields}
    data={props.person}
    onChange={p => {
      // add update function
    }}
  />
)

export const FormThemeContext = configureTheme({})

export const App = () => (
  <FormThemeContext.Provider value={getTheme()}>
    <PersonForm
      person={{
        name: 'Luke',
        hairColor: 'brown',
        age: 23,
        height: 194,
        description: 'very cool',
        email: 'luke@google.com',
        website: 'www.foronered.com',
      }}
    />
  </FormThemeContext.Provider>
)

```
