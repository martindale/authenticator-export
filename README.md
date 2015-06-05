# authenticator-export
Export Google Authenticator data from the application database.  Capturing this
file is left as an excercise to the reader, but @unusualbob has a [fantastic set
of instructions for this][instructions].

[instructions]: https://robriddle.io/transferring-google-authenticator-data-between-phones/

## Running
1. Place your `database` directly in the root of this project.
2. Run `node index.js`.
3. Load http://localhost:1500 and import your codes!
