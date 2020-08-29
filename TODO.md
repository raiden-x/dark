# Things to do

## Must Do

- [x] check if the client code is working
- [ ] Go through the Learn Node website
- [ ] figure out the difference between the listening port and websocket ports
- [ ] check the security features added in the java code(use passport JS?) for login
- [ ] check how to write sql queries instead of using ORM using sql murder mysteries
- [ ] Create Tables
- [ ] Create corresponding rest end points
- [ ] refresh concepts about the network layers
- [ ] figure out how websocket works
- [ ] install heroku cli
- [ ] deploy to heroku
- [ ] update linkedIn

## Stretch Goals

- [ ] Add link preview in chat
- [ ] Add video chat to the application

## Rest Endpoints

### Protected Rest Endpoints

- [ ] add to watchList
- [ ] remove from watchList
- [ ] user check
  - [ ] returns boolean
- [ ] load ignore list
- [ ] add to ignore list
- [ ] remove from ignore list
- [x] Logout
  - [x] clears cookies in the browser

### Non Protected End points

- [ ] login
  - [x] check if username/password matches send error message
  - [x] set XSRF Token
  - [x] set cookie bearer  - HTTP only
- [ ] register
  - [x] check if username exists
  - [ ] check if password meets the minimum requirement

## Websocket

- [ ] listen to message
- [ ] Status Change
- [ ] send message

## Questions to Ask

- [ ] Are we renewing the expiry time of the jwt tokens and the cookies?
- [ ] check if the cookies are encrypted