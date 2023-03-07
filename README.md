# Employee Creator <!-- omit in toc -->

<!-- {add test badges here, all projects you build from here on out will have tests, therefore you should have github workflow badges at the top of your repositories: [Github Workflow Badges](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge)} -->

## Demo / Screenshots

### Demo

[Open Demo hosted on AWS Elastic Beanstalk](http://mcemployeecreator.ap-southeast-2.elasticbeanstalk.com/)

### Screenshots

![List of employees](https://i.imgur.com/5aU8Djd.png)
![Employee details](https://i.imgur.com/7i0JQ9F.png)
![Employee details with inline validation](https://i.imgur.com/OYSI9lK.png)
![Responsive design](https://i.imgur.com/yzJo1uN.png)

---

## Requirements / Purpose

### Requirements

An employee tracking system where people can view, add, edit and remove employee details. Front end uses React and the back end is a RESTful API of any choice.

### Purpose

To learn and apply new technology and demonstrate my competency as a full stack developer.

### Stack

#### Front end

-   React - framework
-   SASS/SCSS - for more features than CSS
-   TypeScript - for type safety and help with code autocomplete
-   React Router Dom - navigate between different pages
-   React Hook Form - store, validate form inputs
-   React Axios - ease of use and increases readability compared to fetch()
-   React Query - reduce the need to use the useEffect hook and provides helpful messages whenever a request isLoading, returns the data or any errors
-   Vitest and React Testing Library (jest-dom, react, user-event) for testing components

### Back end

-   Java 17 and Spring Boot
-   Spring Web
-   Validation I/O
-   Spring Data JPA
-   MySQL Driver
-   Spring Devtools
-   Java Faker
-   Spring Starter Test
-   JUnit, AssertJ, Mockito

### Tools Used

-   Vite - creating a starting React app
-   VS Code - IDE
-   Prettier - tidy up code in spacing and structure
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
5. Run back end `./mvnw spring-boot:run` or run the `src/main/java/com/matthewchhay/employeeCreator/EmployeeCreatorApplication.java`

---

## Test Steps

### Front end

1. Run `npm test`

### Back end

1. Run `./mvnw test`

---

## Design Goals / Approach

### Front end

I created several key components which include the EmployeeCard to be mapped in the EmployeeList and a form inside EmployeeDetails. After that, I created an array of employees with faker.js to simulate an employee details and check EmployeeCard was displaying the correct information. I styled the components using SASS/SCSS because it allowed me to adopt mixins for responsive design and partials for sharing global variables such as colour.

Inside EmployeeDetails, I added HTML inputs and styled the different form inputs to be as similar to the provided wireframes. Then, I added React Hook Form to validate the form inputs, provide clear instructions to the user and store the inputs for processing.

I added enums to fields that had radio buttons or a drop down menu, which include the Work Type and Contract Type and the Month. This was to map the different options and reduce duplicated code.

I used Axios over the fetch() for its ease of use and to learn a new technology, this allowed me to save all Axios methods in the `src/services` folder.

I used React Query to reduce the need for using React's useEffect hook and it comes with a useQuery/useMutation to appropriately handle the request `isLoading`, `isSuccess`, `isError` states with messages and returns the response `data` or an `error`.

I created a message component to ensure styling consistency and reduce the number of styles passed in. The component contains two props, the children and an optional prop `type` = `"loading"`, `"success"`, `"error"` and `"warning"`. The children prop is a string passed from the parent component.

I used Vitest to mock Axios API calls and React Testing library to check if text is rendered to the screen and see if the element contains specific classNames.

### Back end

During my training program I was shown to use Eclipse for Java projects but I switched to VS Code because it provided me with a more productive development environment. The ability to stay with the same IDE for front end and back end, zooming in/out and support for extensions such as Prettier were key factors.

I created an employee domain which consists of:

-   Entity - stores the fields for a record
-   Controller - receives requests from the front end or through Postman, and returns the response or any errors, communicates to and from the service
-   DTO - checks the types of the incoming payload, using a single DTO reduces repetition because creating or updating an employee requires the same payload
-   Service - performs methods based on the repository and data cleaning
-   Repository - communicates between the service and the database

Enums were created for the work types and contract types to ensure that high-quality data is stored in the database. Manual testing was conducted using Postman to verify that different payloads and HTTP methods returned the expected responses and errors.

JUnit and AssertJ were used to check the expected output with `assertThat` and compare two variables with `isEqualTo`. Initially, I created unit tests for the EmployeeService. I used Mockito was used to mock the interaction between the EmployeeRepository and the EmployeeService, and to check that the methods in the service were actually called. After testing the EmployeeService, I moved on to the EmployeeController, where I mocked the EmployeeService's return and compared the response body and status codes.

Logger.slf4j was used to create custom logging messages. Successful requests used `logger.info` and errors used `logger.error`. Try and catches were implemented for calling any service related methods at the EmployeeController in case there are any unexpected server errors.

---

## Features

-   Fetch list of employees
-   Fetch employee by id in the URL and load employee details into the form
-   Add or update an employee and validate user inputs and save to the database
-   Delete an employee

---

## Known issues

-   All date inputs become red if there is an error with `checkDates` e.g. missing inputs, valid start or finish date, start date must be before finish date

---

## Future Goals

-   Create front end tests for EmployeeList, EmployeeDetails and their query / mutations
-   Create unit tests checking the DTO
-   Create unit tests checking the startDate must be before finishDate
-   Switch from useEffect to useQuery for EmployeeDetails
-   Address field should autocomplete using Google Maps API

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
-   Create back end Spring Boot project with Employee domain and `findOnEmployee`, `addEmployee`, and `updateEmployee` methods
-   Manually test endpoints using Postman
-   Add footer

### 22/02/2023 - Form validation

-   Add delete employee by Id to back end
-   Add React Hook Form
-   Add inline validation messages and accessibility by leveraging ARIA
-   Add error styling whenever user enters invalid input (e.g. missing input or wrong pattern)

### 23/02/2023 - Axios set up

-   Fix CORS issue appearing on front end by adding @CrossOrigin to the back end Controller
-   Create Axios file `EmployeeAPI.ts` in services with methods `addEmployee`, `getEmployeeList`, `getEmployee`, `updateEmployee`, and `deleteEmployee`
-   Fetch list of employees from API using Axios and React Query with appropriate error handling
-   Manually test EmployeeList when the server is offline or when there are no employees
-   Fetch employee by Id from API using Axios and useEffect when clicking 'Edit' and loading employee details into the React Hook Form with `reset()`
-   Save new employee to API using Axios and React Query, useMutation and returned confirmation to the user at the bottom of the form

### 24/02/2023 - React query set up

-   Update README
-   Add delete employee by Id using React Query and Axios with error handling appearing on the EmployeeCard
-   Remove useEffect for fetching employee by Id
-   Add updating employee by Id using React Query and Axios with confirmation and error handling
-   Add trim/capitalise first letter of firstName, middleName, lastName and address on the back end
-   Remove useState messages and errors from EmployeeList and replace with `useMutation.isLoading` or `useMutation.isSuccess` or `useMutation.isError`
-   Fix loading month dropdowns when fetching employee
-   Loading employee details will only run if `employee/:id` is a number and not zero, this removed

### 25/02/2023 - React query

-   Fix display of error messages in EmployeeDetails when loading, saving and updating
-   Start front end testing
-   Add Message component and display warning if there are no employees in EmployeeList
-   Remove console.logs
-   Hide form when unable to fetch employee Id with numbers

### 26/02/2023 - Testing and documentation

-   Update README
-   Move ContractTypesEnum and WorkTypesEnum into their own files
-   Add Java Faker to create fake employees for testing
-   Add unit tests in EmployeeService class
-   Show only warnings in back end
-   Add unit tests in EmployeeAPI, InlineButtons, NotFound components

### 27/02/2023 - Further testing

-   Update README
-   Add unit tests in EmployeeController class
-   Change warning message background colour
-   Add link on name in EmployeeCard to EmployeeDetails
-   Add logger.slf4j to back end
-   Create EmployeeAdd and EmployeeUpdate to reduce EmployeeDetails logic
-   Move Types, Enums, ErrorData, DateFunctions into a shared folder

### 28/02/2023 - Deploy on AWS

-   Change backend endpoint to start with `/api` to not confuse with the front end when hosting on AWS
-   Remove `/employeeCreator` prefix from router links and base
-   Deploy to AWS Beanstalk
-   Display back end error messages with
-   Add scroll to top when adding an employee successfully because the form gets reset
-   Add scroll to bottom if there are any errors when adding or updating an employee
-   Rearrange order of Messages
-   Update README to include documentation on setting up an AWS Elastic Beanstalk and how to create a .war file

### 1/03/2023 - Fixing issues

-   Update meta tags to include the AWS Beanstalk link
-   Fix form reset after adding a new employee by adding a useEffect

### 6/03/2023 - Fixing dates

-   Fix day date inputs to accept leading zeros (e.g. 01-09) and remove leading zero when viewing the EmployeeDetails again
-   Add start date must be before finish date validation to front end
-   Disable finish date inputs if On going is checked
-   Hide placeholder values for finish date if On going is checked
-   Add today's date as a placeholder for day inputs
-   Allow back end to accept null for finish date
-   Add DateFunction unit tests
-   Fix employee card to not display a duration if employee duration is in the future
-   Change from calculating duration in milliseconds to the difference in months and years between two dates
-   Add future employee starting on startDate to EmployeeCard

### 7/03/2023

-   Add validate date checks with error messages
-   Add isValidate function with unit tests

--

## What did you struggle with?

### Struggle 1 - Radio buttons and checkboxes labels could not be clicked

I discovered this problem when I adopted React Hook Form and the labels broke. I thought the labels were connected the input with its `name` attribute in the input and `htmlFor` in the label attribute because they were working before adopting React Hook Form. To fix this, I realised I needed to surround the input with the label as shown in my current implementation.

```html
<!-- Initial implementation -->
<input name="isOngoing" id="isOngoing" />
<label htmlFor="isOngoing">On going</label>

<!-- Current implementation -->
<label>
	<input />
</label>
```

### Struggle 2 - Mapping radio buttons and drop down menus

I struggled with mapping the drop down menu for the Months fields and radio buttons for the WorkType and ContractType fields. I discovered to map different options by adopting the following:

```tsx
// Mapping
{
	Object.values(MonthsEnum).map((month) => (
		<option key={month} value={month}>
			{month}
		</option>
	));
}
```

Initially, my MonthsEnum had no initialisers and I discovered that the `Object.values(MonthsEnum).map` mapped both the key and the value. I did not want this to happen because it could mislead users into thinking a month is missing, or accidentally choose "5" for May when it should be "4" since the index starts at zero. To resolve this, I added initialisers as shown in the current implementation below.

```tsx
// Initial implementation
enum MonthsEnum {
	JANUARY,
	FEBRUARY,
	MARCH,
	APRIL,
	MAY,
	JUNE,
	JULY,
	AUGUST,
	SEPTEMBER,
	OCTOBER,
	NOVEMBER,
	DECEMBER,
}
// Mapping:
// - JANUARY
// - FEBRUARY
// - ...
// - DECEMBER
// - 0
// - ...
// - 11

// Current implementation
enum MonthsEnum {
	JANUARY = "January",
	FEBRUARY = "February",
	MARCH = "March",
	APRIL = "April",
	MAY = "May",
	JUNE = "June",
	JULY = "July",
	AUGUST = "August",
	SEPTEMBER = "September",
	OCTOBER = "October",
	NOVEMBER = "November",
	DECEMBER = "December",
}
// Mapping:
// - January
// - February
// - ...
// - December
```

### Struggle 3 - Getting ready for the DTO

When making the front end form and the backend, I noticed it was necessary to process the form inputs because the form contains separate fields for the date. e.g. `startDateDay`, `startDateMonth`, `startDateYear`. The date fields needed to be in a format of `YYYY-MM-DD`. I created some functions which converts the month name to month value and vice versa and also adds a leading zero when a date or month value is less than 10.

For the radio buttons, the selected value in contractType and workType needed to be capitalised and the `-` symbol be replaced with `_` otherwise the back end would reject it.

I used console.table on the form inputs and the payload to ensure the back end could accept the incoming payload.

### Struggle 4 - Displaying descriptive error messages

I aimed to improve the user experience by handling error messages and displaying them to the user instead of just logging them to the console. I tested this by shutting down my back end and attempting to saving the form with a `startDate` greater than the `finishDate`.
However, when adding or updating an employee and encountering an error, the error message was unclear.
Originally, I had `addMutation.error.message` but it had an non-descriptive message of: `Request failed with status code 400`. When checking the console, I noticed there was a `response.data.message` and I was able to display the message to the user using `addMutation.error.response.data.message` at the cost of ignoring type safety due to the type being unknown or optional. I solved this problem by creating my own error type to match the fields in the response data.

```tsx
// 1. Specify the type of mutation.error.response.data
type ErrorData = {
	error: string;
	message: string; // e.g.  "Start date must be before finish date"
	path: string;
	timestamp: string;
	status: number;
};

// 2. Specify multiple && conditions as the response may be optional
{
	addMutation.isError && addMutation.error.response && (
		<Message type="error">
			{`${(addMutation.error.response.data as ErrorData).message}`}
		</Message>
	);
}
```

### Struggle 5 - React Query and Mutations

I decided to make the switch from using `useEffect` to React Query because it would reduce my reliance on `useState`. However, I faced some difficulty in learning the syntax of `useQuery` and `useMutation` with Axios, particularly when methods take in multiple parameters. To overcome this difficulty, I reviewed multiple resources and sample projects that helped me gain a better understanding of React Query. It was beneficial to check `isLoading`, `isError`, and `isSuccess` states when calling a query or a mutation. These React Query states were very useful because I was able to implement specific messages to indicate what state Axios request was is in, since feedback to the user is important.

```tsx
// Originally I fetched an employee by Id with useEffect and Axios
useEffect(() => {
	if (employeeId) {
		getEmployee(employeeId)
			.then((employee) => {
				setEmployee(employee);
				console.log("Loaded employee");
				console.table(employee);
				loadDetails(employee);
			})
			.catch((err) => console.log(err));
	}
}, []);

// Fetch employee by Id with React Query and Axios
if (employeeId) {
	query = useQuery(["employee", employeeId], () => getEmployee(employeeId), {
		onSuccess: (employee: EmployeeType) => {
			setDisplayForm(true);
			loadDetails(employee);
		},
		onError: (error: AxiosError) => {
			setDisplayForm(false);
		},
	});
}

// Example using the additional properties with React Query
{
	query?.isLoading && (
		<Message type="loading">{`Loading employee Id ${employeeId}`}</Message>
	);
}
{
	query?.isSuccess && <div>{`Employee Id ${query.data.id}`}</div>;
}
```

Another problem I had was with the InlineButtons, the component takes in the employee id as a prop so that when clicking on `Edit` button, the user will be directed to the EmployeeDetails page and the form loads with with that employee's details based on the `id` in the URL due to use `useParams()`. However, I encountered a bit of difficulty with the `Remove` button because when removing an employee, it should remove the specific EmployeeCard in EmployeeList. I discovered that I could use a mutation inside my InlineButtons component to send a DELETE request to my API and then invalidate and refetch my list of employees with `queryClient.invalidateQueries("employees`. I was faced with another issue where I wanted to display an error message to the user when the remove button did not work (e.g. the employee was already deleted from the database). To address this, I used a useState prop to pass the error message from my InlineButtons component to the EmployeeCard.

### Struggle 6 - Back end testing

I discovered developers break their tests into AAA - Act, Arrange and Assert or GWT - Given, When, Then.
Many resources online had different annotations and I struggled what was Mockito and what annotations to put at the top of my tests. I found [this article](https://thepracticaldeveloper.com/guide-spring-boot-controller-tests/) and it helped me understand the different types of tests with illustrations. I now know Mockito is used to mock the return when calling a method in a class without the need to setup a database.
In the EmployeeService class, I mocked the Repository and verifying the service methods were called and comparing the returned employee fields.
In the EmployeeController class, I mocked the Service and verifying its methods and checking the ResponseEntity's status code/body for successful cases and ResponseStatusException's status code/detail for bad requests.

---

<!-- ## Licensing Details

-   What type of license are you releasing this under?

---

## Further details, related projects, reimplementations

-   Is this project a reimplementation for something you've done in the past? if so explain it and link it here.
-   If it's an API, is there a client app that works with this project? link it -->

-

## Resources that helped me along the way

### Front end

-   [Treat numbers with leading zeros as strings (e.g. mobile numbers)](https://stackoverflow.com/questions/27361565/why-is-json-invalid-if-an-integer-begins-with-a-leading-zero#:~:text=A%20leading%200%20indicates%20an,would%20not%20contain%20an%208)
-   [Fake Data: Faker.js API outputs](https://fakerjs.dev/api/)
-   [Fake Data: How to create an array of n faker objects](https://stackoverflow.com/questions/42861732/generate-an-array-with-random-data-without-using-a-for-loop)
-   [React Hook Form: React Hook Form Docs - Getting Started](https://react-hook-form.com/get-started)
-   [React Hook Form: Builder](https://react-hook-form.com/form-builder)
-   [React Hook Form: Accessibility and error handling](https://react-hook-form.com/advanced-usage)
-   [React Hook Form: Reset form state](https://react-hook-form.com/api/useform/reset/)
-   [React Query: React Query Docs - Quick Start for useQuery/useQueryClient, useMutation](https://react-query-v3.tanstack.com/quick-start)
-   [React Query/Axios: Fetch employees example](https://www.frontendmag.com/insights/react-query-vs-axios-comparison/#:~:text=Together%2C%20React%20Query%20and%20Axios,the%20requests%20to%20the%20server)
-   [React Query/Axios: Delete Mutation example](https://www.positronx.io/react-query-handle-delete-request-with-usemutation-tutorial/)
-   [Testing: React Testing Library](https://testing-library.com/docs/react-testing-library/example-intro/)
-   [Testing: Vitest example](https://waresix.engineering/vitest-unit-testing-to-test-react-application-177ade1e6c1b)
-   [Testing: Axios test](https://stackoverflow.com/questions/45016033/how-do-i-test-axios-in-jest)

### Back end

-   [Console: Set Spring.jpa.open-in-view to false](https://stackoverflow.com/questions/30549489/what-is-this-spring-jpa-open-in-view-true-property-in-spring-boot)
-   [Fake Data: Java faker list of outputs](https://github.com/DiUS/java-faker)
-   [Testing: Spring Docs - Testing the Web Layer](https://spring.io/guides/gs/testing-web/)
-   [Testing: "Given, When, Then", using Mockito/AssertJ for getAll and Add methods in the service](https://youtu.be/Geq60OVyBPg?t=2553)
-   [Testing: Mock Optional<Employee> for finding EmployeeById](https://stackoverflow.com/questions/56693039/mockito-how-to-test-findbyid-returning-an-optional)
-   [Testing: Exception Testing for bad requests](https://stackoverflow.com/questions/61087747/testing-response-after-expected-exception-is-thrown)
-   [Logging: Setting up org.slf4j.Logger](https://www.appsdeveloperblog.com/spring-boot-logging-with-loggerfactory/)

### How to deploy on AWS Elastic Beanstalk?

The following steps are documented so that for future projects, I can reference this section or to create a Github Action that automatically deploys to AWS Elastic Beanstalk.

#### Prerequisites

##### Development Environment

1. Front end: Add the following to the `vite.config.ts` file and change the `outDir` to your backend's `/src/main/resources/static` folder.
    ```
    build: {
    		outDir: "../backend/employeeCreator/src/main/resources/static",
    		emptyOutDir: true,
    	},
    	server: {
    		proxy: {
    			"/api": {
    				target: "http://localhost:8080/",
    				changeOrigin: true,
    				secure: false,
    			},
    		},
    	},
    ```
2. Front end: Ensure your EmployeeAPI's `BASE_URL` is the same as the proxy of `/api` in the `vite.config.ts` file. This will prevent confusion with your back end request mapping and visiting any links
3. Back end: Update your EmployeeController's RequestMapping with `@RequestMapping("/api/employees")`
4. Back end: Update the `pom.xml` file to include `<packaging>war</packaging>` below the description
5. Run the front end and the back end and test everything is working as before
6. Create AWS account and set up an account

#### How to build the .war file

1. Front end: Run `npm run build`
2. Back end: Run maven build in Eclipse by clicking on the arrow next to the Play button. Or, run `./mvnw clean install` (wasn't working for me)
3. If using Eclipse, make sure goals includes `clean install`
4. Find the `.war` file in `/backend/employeeCreator/target/`
5. Now you're ready to upload to AWS Elastic Beanstalk

##### AWS Elastic Beanstalk Environment

1. Open AWS > Elastic Beanstalk
2. Click Create a new environment
3. Select Web server environment
4. Set application name
5. Set environment name (This cannot be changed later!)
6. Set Domain (This cannot be changed later!)
7. Set Platform to Java
8. Upload your code > choose the `.war` file (Don't press Create environment yet!)
9. Configure more options
10. Go to Software > Edit
11. Add the following additional environment properties, ensure the values are consistent with your `application.properties` file, and save
    | **Name** | **Value** |
    |-------------------------------|------------------------------------|
    | SERVER_PORT | 5000 |
    | SPRING_DATASOURCE_PASSWORD | MyPass |
    | SPRING_DATASOURCE_USERNAME | root |
    | SPRING_JPA_DATABASE_PLATFORM | org.hibernate.dialect.MySQLDialect |
    | SPRING_JPA_HIBERNATE_DDL_AUTO | update |
12. Create environment (this will take a while)
13. Create database and enter the username and password as per the `application.properties` file
14. Copy the database endpoint URL
15. Go to Configurations > Software > Edit
16. Add the following environment property, replace **YOURDOMAIN** with your database endpoint and save
    | **Name** | **Value** |
    |-----------------------|------------------------------------|
    | SPRING_DATASOURCE_URL | jdbc:mysql://**YOURDOMAIN**/ebdb |
17. Wait for the environment to be ready
18. Visit your domain link and it should be good to go!
