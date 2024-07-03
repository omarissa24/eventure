### User Schema

| **Before**          | **After**                |
|----------------------------|------------------------------------|
| `UserID` (int, PK)         | `clerkId` (unique identifier)      |
| `Name` (string)            | `firstName` (string)               |
|                            | `lastName` (string)                |
| `Email` (string)           | `email` (unique, required)         |
| `Password` (string)        |       `password handled by clerk`                             |
| `Role` (string)            | `role` (defines access level)      |
|                            | `photo` (URL, required)            |

### Event Schema

| **Before**           | **After**                 |
|-----------------------------|-------------------------------------|
| `EventID` (int, PK)         |         `_id` (ObjectId)                            |
| `Title` (string)            | `title` (mandatory)                 |
| `Description` (string)      | `description` (optional)            |
| `Date` (datetime)           | `createdAt` (timestamp)             |
|                             | `startDateTime` (defaults to now)   |
|                             | `endDateTime` (defaults to now)     |
| `Location` (string)         | `location` (optional)               |
|                             | `imageUrl` (URL, required)          |
|                             | `price` (cost)                      |
|                             | `isFree` (boolean, defaults to false)|
|                             | `url` (optional)                    |
|                             | `category` (reference to `Category` model) |
| `UserID` (Foreign Key)      | `organizer` (reference to `User` model) |
|                             | `participants` (array of references to `User` model) |

### Task Schema

| **Before**            | **After**                 |
|------------------------------|-------------------------------------|
| `TaskID` (int, PK)           |                  `_id` (ObjectId)                      |
| `Title` (string)             | `title` (mandatory)                 |
| `Description` (string)       | `description` (optional)            |
| `Status` (string)            | `completed` (boolean, defaults to false) |
| `Deadline` (datetime)        | `deadline` (required)               |
| `EventID` (Foreign Key)      | `event` (reference to `Event` model) |
| `AssigneeID` (Foreign Key)   | `assignee` (optional reference to `User` model) |
|                              | `creator` (reference to `User` model) |

### Participant Schema

| **Before**             | **After**                 |
|-------------------------------|-------------------------------------|
| `ParticipantID` (int, PK)     |          `participants` (array of references to `User` model within `Event` schema)                           |
| `UserID` (Foreign Key)        |                                     |
| `EventID` (Foreign Key)       |                                     |
| `Role` (string)               |                                     |

### Category Schema (New)

| **Before**             | **After**                 |
|-------------------------------|-------------------------------------|
|                               | `name` (required, unique)           |