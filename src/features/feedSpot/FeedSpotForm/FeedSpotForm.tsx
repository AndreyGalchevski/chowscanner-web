import React, {
  FunctionComponent,
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
} from "react";
import { useParams } from "react-router-dom";

import { useFeedSpotActions, useFeedSpotState } from "../FeedSpotContext";
import { useI18nState } from "../../i18n/I18nContext";

export interface FormData {
  name: string;
  specie: string;
  animalsCount: number;
  address: string;
}

interface Props {
  isEditMode: boolean;
}

const FeedSpotForm: FunctionComponent<Props> = ({ isEditMode }) => {
  const { spotID } = useParams<{ spotID: string }>();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    specie: "",
    animalsCount: 0,
    address: "",
  });
  const { isFetching, isProcessing, currentSpot } = useFeedSpotState();
  const { fetchFeedSpot, saveFeedSpot } = useFeedSpotActions();
  const { translate } = useI18nState();

  useEffect(() => {
    const init = () => {
      if (isEditMode) {
        fetchFeedSpot(spotID);
      }
    };
    init();
  }, [fetchFeedSpot, isEditMode, spotID]);

  useEffect(() => {
    if (isEditMode && currentSpot) {
      setFormData({
        name: currentSpot.name,
        specie: currentSpot.specie,
        animalsCount: currentSpot.animalsCount,
        address: "",
      });
    }
  }, [currentSpot, isEditMode]);

  const handleInputChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    saveFeedSpot(formData);
  };

  if (isFetching) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      <h3>{isEditMode ? translate("edit_spot") : translate("new_spot")}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Spot name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={formData?.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="address">Spot address</label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Address"
            value={formData?.address}
            onChange={handleInputChange}
          />
        </div>
        <label htmlFor="specie">Specie:</label>
        <select
          id="specie"
          name="specie"
          value={formData?.specie}
          onChange={handleInputChange}
        >
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
        </select>
        <div>
          <label htmlFor="animalsCount">Animals count</label>
          <input
            id="animalsCount"
            name="animalsCount"
            type="number"
            placeholder="Animals Count"
            value={formData?.animalsCount}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">{isProcessing ? "Saving..." : "Save"}</button>
      </form>
    </section>
  );
};

export default FeedSpotForm;
