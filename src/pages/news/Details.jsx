import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sanityClient } from "../../lib/sanity/getClient";
import SanityBlockContent from "@sanity/block-content-to-react";
import { Skeleton, Spin } from "antd";
import moment from "moment";

export const serializers = {
  types: {
    block: (props) => {
      if (!props.node) return;
      const { style = "normal" } = props.node;
      if (style === "normal") {
        return <p className="pt-4 text-[#07314F]">{props.children}</p>;
      }
      return SanityBlockContent.defaultSerializers.types.block(props);
    },
  },
};

function NewsDetail() {
    const navigate = useNavigate();
    const params = useParams();
    const id = String(params.id)
    const [serverData, setServerData] = useState({
        data: [],
        error: null,
        loading: true,
    });

    useEffect(() => {
        async function fetchSanityData() {
            try {
            const sanityData = await sanityClient.fetch(`*[_type == 'post' && slug.current == "${id}"]{
                _id,
                title,
                slug,
                excerpt,
                author->{name},
                "imageURL":mainImage.asset->url,
                categories[]->{title},
                publishedAt,
                body
            }| order(publishedAt desc)`);

            setServerData({
                data: sanityData,
                error: null,
                loading: false,
            });
            } catch (error) {
            setServerData({
                data: [],
                error: 'Error getting data. Please try again later.',
                loading: false,
            });
        }
    }

    fetchSanityData();
    }, []);
    console.log('cek news: ', serverData)
    return (
        <div className="my-0 mx-auto min-h-full max-w-screen-sm bg-white mb-20">
            <div className="relative rounded-b-3xl py-2 bg-[#112340] text-white">
                <h2 className="text-xl text-center px-4 py-4">Detail News</h2>
                <div onClick={() => navigate("/artikel")} className="absolute left-5 top-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 12H4m0 0l6-6m-6 6l6 6"/></svg>
                </div>
            </div>

            <div className="py-6 px-4">
                <div>
                    {!serverData?.data[0]?.imageURL ? (
                        <Skeleton.Image active style={{ width: "360px", height: "192px", borderRadius: "16px" }}  />
                    ) : (
                        <img
                            className="rounded-2xl w-full h-48 object-cover"
                            src={serverData?.data[0]?.imageURL}
                            alt="News"
                        />
                    )}
                </div>
                <div className="mt-2">
                    <h2 className="text-xl font-semibold">
                        {serverData?.data[0]?.title}
                    </h2>
                    <p className="text-sm text-gray-400">{moment(serverData?.data[0]?.publishedAt).format('LL')}</p>
                </div>
            </div>

            <div className="border-t px-4 py-4">
            {serverData?.data ? (
                <SanityBlockContent
                    blocks={serverData?.data[0]?.body}
                    serializers={serializers}
                    dataset={sanityClient.config().dataset}
                    projectId={sanityClient.config().projectId}
                />
            ) : (
                <div><Spin /></div>
            )}
            </div>
        </div>
    )
}

export default NewsDetail