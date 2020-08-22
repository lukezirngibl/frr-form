# Configurable React + TS Form

### Motivation

It seems like 90% of a frontend developer's life is implementing forms. Forms, forms, forms. They're boring and styling them is a pain. You usually end up with way too much code for something that seems so boilerplate. For this reason, I've been using a configuraeable typesafe form instead. You provide the styling & layout once via a context hook and BOOM, you can crank out tons of forms throughout your app with just a configuration array. NO STYLING. NO JSX. Of course there are limitiations, but for your standard day-to-day forms, this library should be suitable. 

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

type Person = {
  name: string;
  hairColor: string
  age: number
  height: number
  description: string
  email: string;
  website: string
}

export const personFormFields: Array<FormField<Person, any>> = [
  {
    type: FormFieldType.FormSection,
    title: 'personInformation',
    fields: [
      [
        {
          label: 'companyName',
          type: FormFieldType.TextInput,
          lens: mkCompanyFormLens(['name']),
          required: true,
        },

        {
          label: 'hairColor',
          type: FormFieldType.TextInput,
          lens: mkCompanyFormLens(['hairColor']),
          required: true,
        },
      ],
      [
        {
          label: 'age',
          type: FormFieldType.TextNumber,
          lens: mkCompanyFormLens(['age']),
          required: true,
        },
        {
          label: 'height',
          type: FormFieldType.TextNumber,
          lens: mkCompanyFormLens(['height']),
          required: true,
        },
      ],
      [
        {
          label: 'description',
          type: FormFieldType.TextInput,
          lens: mkCompanyFormLens(['description']),
          required: true,
        },
      ],
      [
        {
          label: 'email',
          type: FormFieldType.TextInput,
          lens: mkCompanyFormLens(['email']),
          required: true,
        },
        {
          label: 'website',
          type: FormFieldType.TextInput,
          lens: mkCompanyFormLens(['url']),
          required: true,
        },
      ],
    ],
  },
]

const PersonForm: (props: { person: Person }) => (
   <Form<Person, any>
      formFields={personFormFields}
      data={props.person}
      onChange={(p) => {
       // add update function
      }}
    />
)

```
