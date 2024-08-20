export const CellComponent = (props) => {
    const element = document.createElement('td');

    render(element, props);

    return { element };
};

const render = async (element, { x, y }) => {
    element.append(`${x}, ${y}`);
};
