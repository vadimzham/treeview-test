Prefer to use Yarn package manager to be sure to install exactly working versions of packages.

Use [json-server](https://github.com/typicode/json-server) package to emulate backend. `json-server --watch db.json --port 4000`. `id` field on db.json needed only for proper json-server working, it's not used by frontend.

POST request to update group name doesn't complies REST API documentation. It was replaced by PATCH request. But if it's really needed for testing on another backend server, it can be uncommented in group.service file.

No tests because angular2-webpack-starter has shitty testing configuration that fails on Linux.
