# Configurable React + TS Form

### Motivation

It seems like 90% of a frontend developer's life is implementing forms. Forms, forms, forms. They're boring and styling them is a pain. You usually end up with way too much code for something that seems so boilerplate. For this reason, I've been using a configurable typesafe form instead. You provide the styling & layout once via a context hook and BOOM, you can crank out tons of forms throughout your app with just a configuration array. NO STYLING. NO JSX. Of course there are limitiations, but for your standard day-to-day forms, this library should be suitable. 

### Getting started:

##### Yarn
```
 yarn add frr-form
```

##### NPM
```
 yarn add frr-form
```

#### Build library

To build the library, run the build script and clean up afterwards
1. Build library with types: ```yarn build-types```
2. (Clean node_modules: ```yarn clean```)

#### Watch mode for local development

In the locale environment you might want to link this library to the consuming application and keep it in watch mode. Follow these steps to prepare the library for the watch mode

0. (One time only) Link package: ```yarn link```
1. Build the types first: ```yarn build-types```
2. Remove the (critical) peer dependencies: ```yarn clean```
3. Start the build in watch mode (babel): ```yarn build:watch```

*IMPORTANT NOTE* Types are not transpiled by Babel. As a consequence, changes of types require a rebuild of the types with the TypeScript compiler in order for consuming applications to receive them.
As the TypeScript compiler requires all dependencies, we first have to install those as well. Unfortunately libraries like React or Style-Components cannot handle duplicate installations of the same package and will crash in the browser during rendering.
That is why we have to clean the _node_modules_ from all peerDependencies before using it.

#### Using local frr-web in development

Follow these steps to run the library with the frr-web package locally in watch mode:
  1. Follow the instructions in the README of the _frr-web_ package to install it and run it locally in watch mode [README](https://github.com/lukezirngibl/frr-web/blob/master/README.md#linking-local-frr-web-library)
  2. Run the _devevlopment watch_ script: ```yarn dev:watch```. This links the web-frr package and start the babel transpiler in watch mode

To create the types with typescript using the local _frr-web_ package, you can run:
```yarn dev:build-types```

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
        description: 'average height',
        email: 'luke@google.com',
        website: 'www.foronered.com',
      }}
    />
  </FormThemeContext.Provider>
)

```
