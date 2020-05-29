export const messages = {
	TODO_CREATED: 'Todo was successfuly created!',
	TODO_DELETED: 'Todo was successfuly deleted!',
	TODO_UPDATED: 'Todo was successfuly updated!',
	REFINE_SEARCH: 'Please refine your search.'
};

export const globals = {
	SEARCH_TEXT_LIMIT: 90
};

export const search = {
	SEARCH_TEXT_LENGTH: `Search term cannot be more than ${globals.SEARCH_TEXT_LIMIT}`
};

export const network = {
	NETWORK_ERROR:
		'Oops, looks like the api is broken, make sure to start json-server'
};

export default {
	globals,
	messages,
	network,
	search
};
