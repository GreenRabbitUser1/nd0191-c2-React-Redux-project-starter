const PollWidget = ({poll}) => {

    return (
        <div className="poll-widget-wrap">
            {
                poll &&
                poll.id
            }
        </div>
    )
};

export default PollWidget;