export const GridComponent = () => {
    const element = document.createElement('div');

    render(element);

    return { element };
};

const render = async (element) => {
    element.append('Grid will be here');
};
