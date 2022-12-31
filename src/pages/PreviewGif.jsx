import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckIcon } from "../components/CheckIcon";
import { Error } from "../components/Error";
import { Loader } from "../components/Loader";
import { getGifById } from "../helpers/getGifById";
import "./PreviewGif.css";

const initialGifDataState = {
  avatarUrl: "",
  profileUrl: "",
  websiteUrl: "",
  gifUrl: "",
  displayName: "",
  userName: "",
  description: "",
  title: "",
};

export const PreviewGif = () => {
  const [allGifData, setAllGifData] = useState(initialGifDataState);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { image: imageId } = useParams();

  useEffect(() => {
    const getGif = async () => {
      setLoading(true);
      try {
        const gifData = await getGifById(imageId);
        const newGifDataFromApi = {
          avatarUrl: gifData.avatar_url,
          profileUrl: gifData.profile_url,
          websiteUrl: gifData.website_url,
          gifUrl: gifData.url,
          displayName: gifData.display_name,
          userName: gifData.username,
          description: gifData.description,
          title: gifData.title,
        };
        setAllGifData(newGifDataFromApi);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
      }
    };
    getGif();
  }, [imageId]);

  return (
    <section className="preview">
      {error ? (
        <Error />
      ) : loading ? (
        <Loader />
      ) : (
        <div className="preview__content">
          <aside className="preview__data-profile">
            <div>
              <img
                className="preview__data-profile-img"
                src={allGifData.avatarUrl}
                alt="avatar"
              />
            </div>

            <div className="preview__data-profile-user">
              <h3>{allGifData.displayName || "User"}</h3>
              <a href={allGifData.profileUrl}>
                @{allGifData.userName} <CheckIcon />
              </a>
              <p className="preview__data-profile-description">
                {allGifData.description || "Not description D:"}
                <a
                  className="preview__data-profile-web"
                  href={allGifData.websiteUrl}
                  target="_blank"
                >
                  {allGifData.websiteUrl.slice(7)}
                </a>
              </p>
            </div>
          </aside>
          <article className="preview__gif-content">
            <h3 className="preview__gif-title">{allGifData.title}</h3>
            <img
              className="preview__gif-image"
              src={allGifData.gifUrl}
              alt=""
            />
          </article>
        </div>
      )}
    </section>
  );
};
