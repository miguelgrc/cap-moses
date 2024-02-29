<p align="center"><img src="docs/logo.png" width="350px"/></p>

<h3 align="center"> 🕹️ <a href="https://cern-sis.github.io/react-formule/">DEMO</a> </h2>

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## :horse: What is Formule?

Formule is a **powerful, user-friendly, extensible and mobile-friendly form building library** based on [JSON Schema](https://json-schema.org/) and [RJSF](https://github.com/rjsf-team/react-jsonschema-form), which aims to make form creation easier for both technical and non-technical people.

It originated from the need of a flexible tool for physicists at CERN to create their custom forms in the [CERN Analysis Preservation](https://github.com/cernanalysispreservation/analysispreservation.cern.ch) application (a process that was originally done by the CAP team who had to manually define the JSON schemas for every member experiment) in a zero-code fashion. This tool proved to be very useful for us to more easily scalate and expand, reaching a wider audience here at CERN. So, we thought it could also be useful for other people and decided to decouple it from CAP and release it as an open source library.

> [!WARNING]
> react-formule has just come out and is undergoing active development, so please feel free to share any issue you find with us and/or to contribute!

## :carousel_horse: How it looks like

A simple setup (see `./formule-demo`) could look like this:

<p align="center"><img src="docs/demo.gif"/></p>

## :racehorse: How it works

Formule consists of the following main components:

- **`FormuleContext`**: Formule components need to be wrapped by a FormuleContext. It also allows you to provide an antd theme and your own custom fields and widgets.
- The form editor, which has been split into three different components that work together for more flexibility:
  - **`SelectOrEdit`** (or, separately, **`SelectFieldType`** and **`PropertyEditor`**): You can select fields to add to the form and customize their properties.
  - **`SchemaPreview`**: A tree view of the fields where you can rearrange or select fields to be edited.
  - **`FormPreview`**: A live, iteractive preview of the form.
- **`FormuleForm`**: You can use it to display a form (JSON Schema) generated by Formule.

It also exports the following functions:

- **`initFormuleSchema`**: Inits the JSONSchema, _needs_ to be run on startup.
- **`getFormuleState`**: Formule has its own internal redux state. You can retrieve it at any moment if you so require for more advanced use cases. If you want to continuosly synchronize the Formule state in your app, you can pass a callback function to FormuleContext instead (see below), which will be called every time the form state changes.

### Field types

Formule includes a variety of predefined field types, grouped in three categories:

- **Simple fields**: `Text`, `Text area`, `Number`, `Checkbox`, `Switch`, `Radio`, `Select` and `Date` fields.
- **Collections**:
  - `Object`: Use it of you want to group fields or to add several of them inside of a `List`.
  - `List`: It allows you to have as many instances of a field or `Object` as you want.
  - `Accordion`: When containing a `List`, it works as a `List` with collapsible entries.
  - `Layer`: When containing a `List`, it works as a `List` whose entries will open in a dialog window.
  - `Tab`: It's commonly supposed to be used as a wrapper around the rest of the elements. You will normally want to add an `Object` inside and you can use it to separate the form in different pages or sections.
- **Advanced fields**: More complex or situational fields such as `URI`, `Rich/Latex editor`, `Tags` and `ID Fetcher`.

You can freely remove some of these predefined fields and add your own custom fields and widgets following the JSON Schema specifications. More details below.

All of these items contain different settings that you can tinker with, separated into **Schema Settings** (_generally_ affecting how the field _works_) and **UI Schema Settings** (_generally_ affecting how the field _looks_ like).

## :horse_racing: Setting it up

### Installation

```sh
npm install react-formule
# or
yarn add react-formule
```

### Basic setup

```jsx
import {
    FormuleContext,
    SelectOrEdit,
    SchemaPreview,
    FormPreview,
    initFormuleSchema
} from "react-formule";

const useEffect(() => initFormuleSchema(), []);

<FormuleContext>
    <SelectOrEdit />
    <SchemaPreview />
    <FormPreview />
</FormuleContext>
```

### Customizing and adding new field types

```jsx
<FormuleContext theme={{token: {colorPrimary: "blue"}}} customFieldTypes={...} customFields={...} customWidgets={...}>
// ...
</FormuleContext>
```

If you use Formule to edit existing JSON schemas that include extra fields (e.g. metadata fields) that you don't want to show up in the Formule editor (i.e. in `SchemaPreview` and `SchemaTree`), you can use `transformSchema` to exclude them:

```jsx
const transformSchema = (schema) => {
  // Remove properties...
  return transformedSchema;
};

<FormuleContext transformSchema={transformSchema}>// ...</FormuleContext>;
```

### Syncing Formule state

If you want to run some logic in your application every time the current Formule state changes in any way (e.g. to run some action every time a new field is added to the form) you can pass a function to be called back when that happens:

```jsx
const handleFormuleStateChange = (newState) => {
  // Do something when the state changes
};

<FormuleContext synchonizeState={handleFormuleStateChange}>
  // ...
</FormuleContext>;
```

Alternatively, you can pull the current state on demand by calling `getFormuleState` at any moment.

> [!TIP]
> For more examples, feel free to browse around the [CERN Analysis Preservation](https://github.com/cernanalysispreservation/analysispreservation.cern.ch) repository, where we use all the features mentioned above.

## :space_invader: Local demo & how to contribute

You can also clone the repo and run `formule-demo` to play around. Follow the instructions in its [README](./formule-demo/README.md): it will explain how to install `react-formule` as a local dependency (with either `yarn link` or, better, `yalc`) so that you can modify Formule and test the changes live in your host app, which will be ideal if you want to troubleshoot or contribute to the project.
