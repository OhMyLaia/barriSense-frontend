import MapPage from "../components/MapPage";
import { useFeedbacks } from "../hooks/useFeedBacks";

function HomePage() {
  const { feedbacks, setFeedbacks } = useFeedbacks();
  console.log(feedbacks);
  return (
    <div>
      <MapPage />
    </div>
  );
}

export default HomePage;
