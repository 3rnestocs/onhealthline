export function getUser() {
    const userString = localStorage.getItem('user');
    if (userString) {
        return JSON.parse(userString); // Parse the string to a JavaScript object
    }
    return null;
}

export function getUserName() {
    const user = getUser();
    if (user) {
        // Access first_name and last_name properties
        const { first_name, last_name } = user;

        // Concatenate first_name and last_name into a string
        const fullName = `${first_name} ${last_name}`;
        return fullName;
    }
    return 'Missing name'; // Handle case where user is not found or properties are missing
}