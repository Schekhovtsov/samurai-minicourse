export const PlayerComponent = (props) => {
    const element = document.createElement('img');

    render(element, props);

    return { element };
};

const render = async (element, { playerNumber }) => {
    element.src = `assets/images/player${playerNumber}.png`;
};
