# Employee Creator <!-- omit in toc -->

<!-- {add test badges here, all projects you build from here on out will have tests, therefore you should have github workflow badges at the top of your repositories: [Github Workflow Badges](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge)} -->

## Demo / Screenshots

### Demo

This demo does not interact with the backend.
[Open Demo](https://chhaymatt.github.io/employeeCreator/)

### Screenshots

![List of employees](https://i.imgur.com/xvmdlzL.png)
![Employee details](https://i.imgur.com/7i0JQ9F.png)
![Employee details with inline validation](https://i.imgur.com/OYSI9lK.png)
![Responsive design](https://i.imgur.com/yzJo1uN.png)

---

## Requirements / Purpose

### Requirements

An employee tracking system where managers can view, add, edit and remove employee details. Front end uses React and the backend is a RESTful API of any choice.

### Purpose

To learn and apply new technology and demonstrate my competency as a full stack developer.

### Stack

#### Frontend

-   React - framework
-   SASS/SCSS - for more features than CSS
-   TypeScript - for type safety and help with code autocomplete
-   React Router Dom - navigate between different pages
-   React Hook Form - store, validate form inputs
-   React Axios - ease of use and increases readability compared to fetch()
-   React Query - reduce the need to use the useEffect hook and provides helpful messages whenever a request isLoading, returns the data or any errors
<!-- -   Vitest for testing components -->

### Backend

-   Java 17 and Spring Boot
-   Spring Web
-   Validation I/O
-   Spring Starter Test
-   Spring Data JPA
-   MySQL Driver
-   Spring Devtools

### Tools Used

-   Vite - creating a starting React app
-   VS Code - IDE
-   Prettier - to tidy up code in spacing and structure
-   Spring Initializr - create a starting Spring app
-   Postman - manual testing endpoints
-   Meta Tags - generate metadata for sharing front end on the web
-   Favicon.io - generate a favicon

---

## Build Steps

1. Copy repo by running `git clone git@github.com:chhaymatt/employeeCreator.git`

### Front end

1. Go to the folder `cd employeeCreator/frontend` and open in your IDE
2. Install packages `npm install`
3. If necessary, change the `BASE_URL` inside `src/services/EmployeeAPI.ts`
4. Run front end `npm run dev`

### Back end

1. Go to the folder `cd employeeCreator/backend/employeeCreator` and open in your IDE
2. If necessary, change the properties (url, user and password) in `src/main/resources/application.properties`
3. Open mySQL Workbench and run `CREATE DATABASE employeeCreator;`
4. If the database already exists, run `DROP DATABASE employeeCreator;` and then rerun `CREATE DATABASE employeeCreator;`
5. Run `./mvnw spring-boot:run`

---

## Design Goals / Approach

### Frontend

I created several key components which include the EmployeeCard to be mapped in the EmployeeList and a form inside EmployeeDetails. After that, I created an array of employees with faker.js to simulate an employee details and check EmployeeCard was displaying the correct information. I styled the components using SASS/SCSS because it allowed me to adopt mixins for responsive design and partials for sharing global variables such as colour.

Inside EmployeeDetails, I added HTML inputs and styled the different form inputs to be as similar to the provided wireframes. Then, I added React Hook Form to validate the form inputs, provide clear instructions to the user and store the inputs for processing.

I added enums to fields that had radio buttons or a drop down menu, which include the Work Type and Contract Type and the Month. This was to map the different options and reduce duplicated code.

I used Axios over the fetch() for its ease of use and to learn a new technology, this allowed me to save all Axios methods in the `src/services` folder.

I used React Query to reduce the need for using React's useEffect hook and it comes with a useQuery/useMutation to appropriately handle the request `isLoading`, `isSuccess`, `isError` states with messages and returns the response `data` or an `error`.

I created a message component to ensure styling consistency and reduce the number of styles passed in. The component contains two props, the children and an optional prop `type` = `"loading"`, `"success"`, `"error"` and `"warning"`. The children prop is a string passed from the parent component.

### Backend

During my training program I was shown to use Eclipse for Java projects but I switched to VS Code because it provided me with a more productive development environment. What makes VS Code better for me was the ability to zooming in/out and support for extensions such as Prettier.

I created an employee domain which consists of:

-   Entity - stores the fields for a record
-   Controller - takes in requests from the front end or through postman and returns the response or any errors, communicates to and from the service
-   DTO - checks the types of the incoming payload, a single DTO to reduce repetition because creating or updating an employee take the same payload
-   Service - performs methods based on the repository and data cleaning
-   Repository - communicates between the service and the database

Enums were created for the work types and contract types to ensure quality data in the database.
Manual testing was conducted with Postman to see different payloads and HTTP methods return the right response and any errors.

---

## Features

-   Fetch list of employees
-   Fetch a specific employee and load employee details into the form
-   Add or update an employee and validate user inputs and save to the database
-   Delete an employee

---

<!-- ## Known issues

-
-

--- -->

## Future Goals

-   Create tests for front end and back end
-   Implementing an API logging strategy

---

## Change logs

### 20/02/2023 - Project setup

-   Setup project
-   Create key components such as `EmployeeCard`, `EmployeeList`, `EmployeeDetails`
-   Create form inputs with HTML validation with `require`
-   Create styling in SASS/SCSS to be similar to the wireframe

### 21/02/2023 - Back end set up

-   Update styling and improved responsiveness
-   Create array of fake employees using faker.js
-   Add react router dom to navigate between the two pages on the Add Employee button in EmployeeList and Back or Cancel buttons in EmployeeDetails
-   Add favicon and meta tags
-   Create backend Spring Boot project with Employee domain and `findOnEmployee`, `addEmployee`, and `updateEmployee` methods
-   Manually test endpoints using Postman
-   Add footer

### 22/02/2023 - Form validation

-   Add delete employee by Id to backend
-   Add React Hook Form
-   Add inline validation messages and accessibility by leveraging ARIA
-   Add error styling whenever user enters invalid input (e.g. missing input or wrong pattern)

### 23/02/2023 - Axios set up

-   Fix CORS issue appearing on front end by adding @CrossOrigin to the backend Controller
-   Create Axios file `EmployeeAPI.ts` in services with methods `addEmployee`, `getEmployeeList`, `getEmployee`, `updateEmployee`, and `deleteEmployee`
-   Fetch list of employees from API using Axios and React Query with appropriate error handling
-   Manually test EmployeeList when the server is offline or when there are no employees
-   Fetch employee by Id from API using Axios and useEffect when clicking 'Edit' and loading employee details into the React Hook Form with `reset()`
-   Save new employee to API using Axios and React Query, useMutation and returned confirmation to the user at the bottom of the form

### 24/02/2023 - React query set up

-   Updated README
-   Add delete employee by Id using React Query and Axios with error handling appearing on the EmployeeCard
-   Remove useEffect for fetching employee by Id
-   Add updating employee by Id using React Query and Axios with confirmation and error handling
-   Add trim/capitalise first letter of firstName, middleName, lastName and address on the backend
-   Remove useState messages and errors from EmployeeList and replace with `useMutation.isLoading` or `useMutation.isSuccess` or `useMutation.isError`
-   Fix loading month dropdowns when fetching employee
-   Loading employee details will only run if `employee/:id` is a number and not zero, this removed

### 25/02/2023 - React query

-   Fix display of error messages in EmployeeDetails when loading, saving and updating
-   Start front end testing
-   Add Message component and display warning if there are no employees in EmployeeList
-   Remove console.logs

---

## What did you struggle with?

### Struggle 1 - Radio buttons and checkboxes labels could not be clicked

I discovered this problem when I adopted React Hook Form and the labels broke. I thought the labels were connected the input with its `name` attribute in the input and `htmlFor` in the label attribute because they were working before adopting React Hook Form. To fix this, I realised I needed to surround the input with the label.

Wrong way:

```html
<input name="isOngoing" id="isOngoing" />
<label htmlFor="isOngoing"> On going </label>
```

The correct way:

```html
<label>
	<input />
</label>
```

### Struggle 2 - Mapping radio buttons and drop down menus

Treating enums like arrays to use .map
Missing value from enum would map both the property word and property index (e.g. January-February AND 1 to 12)

### Struggle 3 - Form Inputs from the front end are slightly different to the EmployeeDTO in the back end

Radio buttons and dropdown menus changing back from value to the Enum property by UpperCase or replacing `-` to `_` otherwise backend will reject
Discovering `id` is an optional field in the EmployeeType because loading employees requires id but creating an employee does not
startDate contains three different fields for the FormInputs, `startDateDay`, `startDateMonth`, `startDateYear` and translating it back to `YYYY-MM-DD`
Finding `MM` based on Enum index from value
`MM` and `DD` requires a leading zero if number is less than 10 otherwise EmployeeDTO won't accept it
Using Console.Table for Inputs and for the payload

### Struggle 4 - Axios errors

Adding employee that returns an error has an unclear error message because it is buried within an optional response data.
The unclear message is: `Request failed with status code 400`
Do I create a new data type?
Solved by adopting AxiosError type in EmployeeList
and in EmployeeCard where the backend errors need more details:

How I solved it?

```tsx
// 1. Specify the type of mutation.error.response.data
type ErrorData = {
	error: string;
	message: string;
	path: string;
	timestamp: string;
	status: number;
};

// 2. Specify multiple && conditions as the response may be optional
{
	updateMutation.isError && updateMutation.error.response && (
		<Message type="error">
			{`${(updateMutation.error.response.data as ErrorData).message}`}
		</Message>
	);
}
```

### Struggle 5 - React Query Mutations

I want to use React Query over useEffect/useState
How do I useQuery or useMutations?
I was successful with EmployeeList because it fetches all employees and doesn't take any parameters
I was also successful with adding employee because it only takes in a payload
But the other methods take in `employeeId` and a payload

Currently loading an employee to the EmployeeDetails component uses the id from the URL and stores the employee in a useState and then fills the details in the form.

Original Fetch

```tsx
const { id } = useParams();

useEffect(() => {
	if (id) {
		getEmployee(+id)
			.then((employee) => {
				setEmployee(employee);
				console.log("Loaded employee");
				console.table(employee);
				loadDetails(employee);
			})
			.catch((err) => console.log(err));
	}
}, []);
```

Examples I found online are like:

```jsx
//
```

Do I need to use useState?, I want to avoid prop drilling because the Edit button is buried in this:
`App -> EmployeeList -> EmployeeCard -> InlineButtons -> Edit`
Could I useContext instead?

### Struggle 6 - Front end testing

Getting className for certain styling
Used toHaveClass
e.g.
class="Button"
Received:
class="\_Button_f8f296 undefined"

Then switched to .getAttribute("class")

---

<!-- ## Licensing Details

-   What type of license are you releasing this under?

---

## Further details, related projects, reimplementations

-   Is this project a reimplementation for something you've done in the past? if so explain it and link it here.
-   If it's an API, is there a client app that works with this project? link it -->

## Resources that helped me along the way

-   Treat any numbers with leading zeros as strings: https://stackoverflow.com/questions/27361565/why-is-json-invalid-if-an-integer-begins-with-a-leading-zero#:~:text=A%20leading%200%20indicates%20an,would%20not%20contain%20an%208.
-   How to find what faker outputs are there: https://fakerjs.dev/api/
-   How to create an array of n faker objects: https://stackoverflow.com/questions/42861732/generate-an-array-with-random-data-without-using-a-for-loop
