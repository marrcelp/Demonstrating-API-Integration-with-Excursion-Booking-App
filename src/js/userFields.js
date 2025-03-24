const fields = [
    {
        name: 'name',
        label: 'Imię i Nazwisko',
        required: true,
        type: 'text'
    },
    {
        name: 'email',
        label: 'E-mail',
        required: true,
        type: 'email',
        pattern: '@'
    },
]

export default fields;