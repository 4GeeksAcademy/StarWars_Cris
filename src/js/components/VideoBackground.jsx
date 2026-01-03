import starsWebm from "../../img/stars.webm";

const VideoBackground = () => {
    return (
        <div className="video-background">
            <video
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={starsWebm} type="video/webm" />
            </video>
        </div>
    );
};

export default VideoBackground;