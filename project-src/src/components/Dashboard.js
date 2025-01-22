import { useEffect } from "react";
import { connect } from "react-redux";
import PollWidget from "./PollWidget";
import { IoMdEye } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";

const Dashboard = (props) => {

    const {polls, dispatch, user} = props;

    const [showViewOptions, setShowViewOptions] = useState(false);

    const [showUnansweredPolls, setShowUnansweredPolls] = useState(true);
    const [showAnsweredPolls, setShowAnsweredPolls] = useState(true);

    useEffect(() => {
        console.log('polls changed!', polls);
    }, [polls])

    const toggleShowViewOptions = () => {
        setShowViewOptions(!showViewOptions);
    }

    const toggleShowUnansweredPolls = () => {
        setShowUnansweredPolls(!showUnansweredPolls)
    }

    const toggleShowAnsweredPolls = () => {
        setShowAnsweredPolls(!showAnsweredPolls)
    }

    return (
        <>
            <div className="view-wrap">
                <div className="view-filter-top" onClick={toggleShowViewOptions}>
                    <IoMdEye />
                    <span>Filter View</span>
                    <FaChevronDown  className={`
                        view-filter-icon 
                        ${(showViewOptions
                            ? ' view-filter-open'
                            : ''
                        )}
                    `} />
                </div>
                {
                    showViewOptions &&
                    <div className="view-options-wrap">
                        <div className="view-options">
                            <div className="view-option">
                                <input type="checkbox" checked={showUnansweredPolls} onChange={toggleShowUnansweredPolls} />
                                <label>Unanswered Polls</label>
                            </div>
                            <div className="view-option">
                                <input type="checkbox" checked={showAnsweredPolls} onChange={toggleShowAnsweredPolls} />
                                <label>Answered Polls</label>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="polls">
                {
                    polls && showUnansweredPolls && 
                    <div className="poll-category">
                        <div className="poll-category-name">
                            Unanswered Polls
                        </div>
                        <div className="poll-wrap">
                            {
                                // Show the unanswered polls
                                
                                Object.keys(polls).map((p) => {
                                    if (!user.answers[p]){
                                        return (
                                            <PollWidget poll={polls[p]} key={p} />
                                        ) 
                                    }
                                })
                            }
                        </div>
                    </div>
                }
                {
                    polls && showAnsweredPolls && 
                    <div className="poll-category">
                        <div className="poll-category-name">
                            Answered Polls
                        </div>
                        <div className="poll-wrap">
                            {
                                // Show the answered polls
                                polls &&
                                Object.keys(polls).map((p) => {
                                    if (user.answers[p]){
                                        return (
                                            <PollWidget poll={polls[p]} key={p} />
                                        ) 
                                    }
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    polls: state.polls,
    user: state.user
});

export default connect(mapStateToProps)(Dashboard);