import GeneralGuide from './general-guide';
import SpecialGuide from './specialized-guide';

const SelectionGuide = ({
  guide = null,
  setGuide,
}: {
  guide: 'general' | 'special' | null;
  setGuide: React.Dispatch<React.SetStateAction<'general' | 'special' | null>>;
}) => {
  return (
    <>
      <SpecialGuide isOpen={guide} setIsOpen={setGuide} />
      <GeneralGuide isOpen={guide} setIsOpen={setGuide} />
    </>
  );
};

export default SelectionGuide;
