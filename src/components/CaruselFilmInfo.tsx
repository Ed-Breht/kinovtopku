import React from "react";
import { FilmType } from "../Api";
import { Button, Dialog, MobileStepper } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import styles from "../components/CaruselFilmInfo.module.scss";

type Props = {
  TargetFilm: FilmType;
};

const CaruselFilmInfo: React.FC<Props> = ({ TargetFilm }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = TargetFilm.FromFilms.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.Wrapper}>
      <SwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {TargetFilm.FromFilms.map((img, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                src={img}
                alt={""}
                className={styles.Img}
                onClick={handleClickOpen}
              />
            ) : null}
          </div>
        ))}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Следующая
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Предыдущая
          </Button>
        }
      />
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="lg">
        <img alt="" src={TargetFilm.FromFilms[activeStep]} />
      </Dialog>
    </div>
  );
};
export default CaruselFilmInfo;
