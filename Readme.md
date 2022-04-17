# Node-Task

## API list with guide

### prerequisite

- Make sure you have installed latest stable version of nodejs
- Make sure port 3000 is available on your system
- To start project run `npm install`,`node index.js`

## APIs

- User
  - Register:
    url: 'http:localhost:3000/api/v1/auth/register'
    method: POST
    data: { sEmail: '', sPassword: '' }
  - Login
    url: 'http:localhost:3000/api/v1/auth/login'
    method: POST
    data: { sEmail: '', sPassword: '' }
  - View Profile
    url: 'http:localhost:3000/api/v1/profile/view'
    method: GET
  - Update Profile
    url: 'http:localhost:3000/api/v1/profile/update',
    method: POST,
    data: { sFirstName: '', sLastName: '', sEmail: '', dBirthDate: '', sEmail: '' }
  - Upload Profile picture
    url: 'http:localhost:3000/api/v1/profile/update/proPic',
    method: POST
    from-data: { sProPic: `with Image` }
- Events
  - Create
    url: 'http:localhost:3000/api/v1/event/create'
    method: POST
    data: { sTitle: '', sDescription: '', nMaxParticipant: (number), sPlace: '', dScheduledAt: (Date & Time) }
  - Join
    url: 'http:localhost:3000/api/v1/event/join/:eventId',
    method: GET
  - Leave
    url: 'http:localhost:3000/api/v1/event/leave/:eventId',
    method: GET
  - List
    url: 'http:localhost:3000/api/v1/event/list',
    method: GET
  - Participants
    url: 'http:localhost:3000/api/v1/event/participants/:eventId',
    method: GET
  - Creator Info
    url: 'http:localhost:3000/api/v1/event/creator/:eventId',
    method: GET
