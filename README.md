# Configurable React + TS Form

## Motivation

It seems like 90% of a frontend developer's life is implementing forms. Forms, forms, forms. They're boring and styling them is a pain. You usually end up with way too much code for something that seems so boilerplate. For this reason, I've been using a configurable typesafe form instead. You provide the styling & layout once via a context hook and BOOM, you can crank out tons of forms throughout your app with just a configuration array. NO STYLING. NO JSX. Of course there are limitiations, but for your standard day-to-day forms, this library should be suitable. 

## Getting started:

##### Yarn
```
 yarn add frr-form
```

##### NPM
```
 yarn add frr-form
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
        description: 'average height',
        email: 'luke@google.com',
        website: 'www.foronered.com',
      }}
    />
  </FormThemeContext.Provider>
)

```


## Development

### Build library

To build the library, run the build script.
1. Install packages: `yarn`
2. Build library with types: `yarn build`

### Develop in watch-mode

Follow these steps to run the library build in watch mode using the local _frr-web_ package:

0. (Follow the instructions in the [README](https://github.com/lukezirngibl/frr-web/blob/master/README.md#linking-local-frr-web-library) of the _frr-web_ package to install it, build it locally and create a symlink)
1. Link the local _frr-web_ package: `yarn link-frr`
2. Build the types first: `yarn build`
3. Start the build in watch mode (babel): `yarn babel:watch` (The script cleans the peerDependencies, links the _frr-web_ package and starts the babel transpiler in watch mode)

To rebuild the types the following actions are required (for the why see **IMPORTANT NOTE** below):
1. (Quit watch mode: `ctrl c`).
2. Run: `yarn build-types`
3. Start babel again: `yarn babel:watch`

### Use package in linked (watch-)mode
You might want to link this library to the consuming application and keep it in watch mode to develop in parallel.

- Create a symlink: `yarn link` (This you have to **do only once**)
- Run build with babel: `yarn babel:watch` 

**IMPORTANT NOTE**
Types are not transpiled by Babel. As a consequence, changes of types require a rebuild of the types with the TypeScript compiler in order for consuming applications to receive them.

As the TypeScript compiler requires all dependencies including peerDependencies, we first have to install those as well. Unfortunately libraries like React or Style-Components cannot handle duplicate installations of the same package in one application and will crash in the browser during rendering.

That is why we have to clean the _node_modules_ from all peerDependencies before using it. And that is also why we cannot really use the TypeScript compiler to develop in watch-mode with linked modules.


### Pitfalls
Building types fails with the error message: 
> The inferred type of 'MainSectionWrapper' cannot be named without a reference to 'frr-web/node_modules/@types/styled-components'. This is likely not portable. A type annotation is necessary.

**Solution**: Do not export styled components directly from a file. The error above is thrown because of the following statement:
```
export const MainSectionWrapper = styled.div`
  flex-grow: 1;
`
```

Remove `export` and the compiler will pass
```
const MainSectionWrapper = styled.div`
  flex-grow: 1;
`
```



