export const SettingsComponent = () => {
    const element = document.createElement('div');

    render(element);

    return { element };
};

const render = async (element) => {
    element.append('Settings will be here');
};
