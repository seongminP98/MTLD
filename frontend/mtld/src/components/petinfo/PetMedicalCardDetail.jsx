import React, { useEffect } from 'react';
import styled from 'styled-components';
import InfoModal from 'components/common/InfoModal';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import Grid from '@mui/material/Grid';
import { batch, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteVaccineInfo, fetchVaccineInfo, editVaccineInfo, registerVaccine, vaccineInfoSelector, vaccineSelector } from 'app/vaccine';
import { fetchMedicineInfo, registerMedicine, editMedicineInfo, medicineInfoSelector, deleteMedicineInfo, medicineSelector } from 'app/medicine';
import { isFulfilled } from '@reduxjs/toolkit';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Spinner from 'components/common/Spinner';
import { editPuppyInfo } from 'app/puppy';

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;

const DogCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eafed1;
  margin-top: 2vh;
  width: 90vw;
  height: 80vh;
  border-radius: 10px;
  box-shadow: 0px 2px 2px 0.1px #5c5c5c;

  .saveButton {
    width: 110px;
    height: 20px;
    border-radius: 10px;
    border: none;
    // box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
    filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
    font-family: 'GmarketSansMedium';
    color: #5c5c5c;
    font-size: 80%;
    background-color: #81e3d7;
  }
`;

const CardDecoLine = styled.div`
  border: white solid 2px;
  width: 80vw;
  height: 75vh;
  border-radius: 8px;
`;

const VaccineForm = styled.div`
  margin-left: 5vw;
  margin-top: 3vh;
  display: flex;
  width: 90%;
  flex-direction: column;
  text-align: start;
  align-items: start;

  h3 {
    color: #81e3d7;
    margin: 0;
    padding: 0;
  }

  h4 {
    color: #5c5c5c;
    margin: 0;
    padding: 0;
    font-size: 95%;
  }

  .dateFormVacc {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    margin: 0.3vh 0;
  }

  .datePicker {
    display: flex;
    width: 100%;
  }

  input {
    font-family: 'GmarketSansMedium';
    font-size: 80%;
    color: #5c5c5c;
    border: none;
    width: 110px;
    display: flex;
    text-align: center;
  }

  .dateDiv1 {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .dateDiv2 {
    display: flex;
    width: 100%;
    z-index: 50;
  }

  .dateTitle {
    color: #5c5c5c;
    font-size: 90%;
  }
`;

const MedicineForm = styled.div`
  margin-left: 5vw;
  margin-top: 3vh;
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: start;

  h3 {
    color: #81e3d7;
    margin: 0;
    padding: 0;
  }

  h4 {
    color: #5c5c5c;
    margin: 0;
    padding: 0;
  }

  p {
    color: #5c5c5c;
    margin: 0;
    padding: 0;
    font-size: 70%;
  }

  .dateFormMed {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    margin: 0.3vh 0;
  }

  .datePicker {
    display: flex;
    width: 100%;
  }

  .vaccineDatePicker {
    display: flex;
  }

  input {
    font-family: 'GmarketSansMedium';
    font-size: 80%;
    color: #5c5c5c;
    border: none;
    width: 110px;
    display: flex;
    text-align: center;
  }

  .dateDiv1 {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .dateDiv2 {
    display: flex;
    width: 100%;
    z-index: 50;
  }

  .dateTitle {
    color: #5c5c5c;
    font-size: 90%;
  }
`;

function PetMedicalCardDetail() {
  const dispatch = useDispatch();
  const vaccineInfo = useSelector(vaccineInfoSelector);
  const vaccine = useSelector(vaccineSelector);
  const medicineInfo = useSelector(medicineInfoSelector);
  const medicine = useSelector(medicineSelector);
  const params = useParams();

  const [dhpplValue, setDhpplValue] = React.useState(''); // DHPPL
  const [coronaValue, setCoronaValue] = React.useState(''); // ?????????
  const [kennelValue, setKennelValue] = React.useState(''); // ????????????
  const [rabisValue, setRabisValue] = React.useState(''); // ?????????
  const [dirofilariaValue, setDirofilariaValue] = React.useState(''); // ???????????????
  const [tickValue, setTickValue] = React.useState(''); // ?????????
  const [anthelminticValue, setAnthelminticValue] = React.useState(''); // ?????????

  const dhpplData = {
    dogId: params.petId,
    expectDate: dhpplValue,
    vaccineId: 1,
  };

  const coronaData = {
    dogId: params.petId,
    expectDate: coronaValue,
    vaccineId: 2,
  };

  const kennelData = {
    dogId: params.petId,
    expectDate: kennelValue,
    vaccineId: 3,
  };

  const rabisData = {
    dogId: params.petId,
    expectDate: rabisValue,
    vaccineId: 4,
  };

  const dirofilariaData = {
    dogId: params.petId,
    expectDate: dirofilariaValue,
    medicineId: 1,
  };

  const tickData = {
    dogId: params.petId,
    expectDate: tickValue,
    medicineId: 2,
  };

  const anthelminticData = {
    dogId: params.petId,
    expectDate: anthelminticValue,
    medicineId: 3,
  };

  function addVaccine() {
    batch(() => {
      dispatch(registerVaccine(dhpplData));
      dispatch(registerVaccine(coronaData));
      dispatch(registerVaccine(kennelData));
      dispatch(registerVaccine(rabisData));
    });
  }

  function editVaccine() {
    for (let i = 0; i < Object.keys(vaccineInfo).length; i += 1) {
      if (vaccineInfo) {
        if (vaccineInfo[i].vaccineId === 1) {
          const dhppl = { id: vaccineInfo[i].id, expectDate: dhpplValue };
          dispatch(editVaccineInfo(dhppl));
        }
        if (vaccineInfo[i].vaccineId === 2) {
          const corona = { id: vaccineInfo[i].id, expectDate: coronaValue };
          dispatch(editVaccineInfo(corona));
        }
        if (vaccineInfo[i].vaccineId === 3) {
          const kennel = { id: vaccineInfo[i].id, expectDate: kennelValue };
          dispatch(editVaccineInfo(kennel));
        }
        if (vaccineInfo[i].vaccineId === 4) {
          const rabis = { id: vaccineInfo[i].id, expectDate: rabisValue };
          dispatch(editVaccineInfo(rabis));
        }
      }
    }
  }

  function deleteVaccine(vaccId) {
    for (let i = 0; i < Object.keys(vaccineInfo).length; i += 1) {
      if (vaccineInfo[i].vaccineId === vaccId) {
        const vaccinationId = vaccineInfo[i].id;
        dispatch(deleteVaccineInfo(vaccinationId));
        if (vaccId === 1) {
          setDhpplValue('');
        } else if (vaccId === 2) {
          setCoronaValue('');
        } else if (vaccId === 3) {
          setKennelValue('');
        } else if (vaccId === 4) {
          setRabisValue('');
        }
      }
    }
  }

  function addMedicine() {
    batch(() => {
      dispatch(registerMedicine(dirofilariaData));
      dispatch(registerMedicine(tickData));
      dispatch(registerMedicine(anthelminticData));
    });
  }

  function editMedicine() {
    for (let i = 0; i < Object.keys(medicineInfo).length; i += 1) {
      if (medicineInfo) {
        if (medicineInfo[i].medicineId === 1) {
          const dirofilaria = { id: medicineInfo[i].id, expectDate: dirofilariaValue };
          dispatch(editMedicineInfo(dirofilaria));
        }
        if (medicineInfo[i].medicineId === 2) {
          const tick = { id: medicineInfo[i].id, expectDate: tickValue };
          dispatch(editMedicineInfo(tick));
        }
        if (medicineInfo[i].medicineId === 3) {
          const anthelmintic = { id: medicineInfo[i].id, expectDate: anthelmintic };
          dispatch(editMedicineInfo(anthelmintic));
        }
      }
    }
  }

  function deleteMedicine(medId) {
    for (let i = 0; i < Object.keys(medicineInfo).length; i += 1) {
      if (medicineInfo[i].medicineId === medId) {
        const medicationId = medicineInfo[i].id;
        dispatch(deleteMedicineInfo(medicationId));
        if (medId === 1) {
          setDirofilariaValue('');
        } else if (medId === 2) {
          setTickValue('');
        } else if (medId === 3) {
          setAnthelminticValue('');
        }
      }
    }
  }

  useEffect(() => {
    const loadData = async () => {
      const action = await dispatch(fetchVaccineInfo(params.petId));
      if (isFulfilled(action)) {
        // console.log(action.payload);
        return action.payload.data;
      }
    };
    loadData().then((vacc) => {
      for (let i = 0; i < vacc.length; i += 1) {
        if (vacc[i].vaccineId === 1) {
          setDhpplValue(vacc[i].expectDate);
        } else if (vacc[i].vaccineId === 2) {
          setCoronaValue(vacc[i].expectDate);
        } else if (vacc[i].vaccineId === 3) {
          setKennelValue(vacc[i].expectDate);
        } else if (vacc[i].vaccineId === 4) {
          setRabisValue(vacc[i].expectDate);
        }
      }
      return null;
    });
  }, []);

  useEffect(() => {
    // console.log(vaccineInfo);
    const loadData = async () => {
      const action = await dispatch(fetchMedicineInfo(params.petId));
      if (isFulfilled(action)) {
        return action.payload.data;
      }
    };
    loadData().then((med) => {
      for (let i = 0; i < med.length; i += 1) {
        if (med[i].medicineId === 1) {
          setDirofilariaValue(med[i].expectDate);
        }
        if (med[i].medicineId === 2) {
          setTickValue(med[i].expectDate);
        }
        if (med[i].medicineId === 3) {
          setAnthelminticValue(med[i].expectDate);
        }
      }
      return null;
    });
  }, []);

  if (!vaccine.loading || !medicine.loading) {
    return <Spinner />;
  }
  return (
    <Wrap>
      <DogCard>
        <CardDecoLine>
          <VaccineForm>
            <div className="title">
              <h3>???????????? ?????????</h3>
              <InfoModal />
            </div>
            <div className="dateFormVacc">
              <h4>DHPPL</h4>
              <div className="datePicker">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={10}>
                      <div className="dateDiv1">
                        <div className="dateTitle">????????????</div>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="??????????????????"
                              value={dhpplValue}
                              minDate={new Date()}
                              onChange={(newValue) => {
                                const date = newValue.$d;
                                const dhpplDate = date.toISOString().slice(0, 10);
                                setDhpplValue(dhpplDate);
                              }}
                              renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <input ref={inputRef} {...inputProps} placeholder="mm/dd/yyyy" />
                                  {InputProps?.endAdornment}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      {dhpplValue ? (
                        <div className="dateDiv2">
                          <NotificationsActiveIcon sx={{ color: '#81e3d7', margin: '0', padding: '0' }} />
                          <CloseRoundedIcon
                            onClick={() => {
                              deleteVaccine(1);
                            }}
                            fontSize="small"
                          />
                        </div>
                      ) : (
                        <div className="dateDiv2">
                          <NotificationsOffIcon sx={{ color: '#81e3d7', margin: '0', padding: '0' }} />
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
            <div className="dateFormVacc">
              <h4>?????????</h4>

              <div className="datePicker">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={10}>
                      <div className="dateDiv1">
                        <div className="dateTitle">????????????</div>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="??????????????????"
                              value={coronaValue}
                              minDate={new Date()}
                              onChange={(newValue) => {
                                const date = newValue.$d;
                                const coronaDate = date.toISOString().slice(0, 10);
                                setCoronaValue(coronaDate);
                              }}
                              renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <input ref={inputRef} {...inputProps} placeholder="mm/dd/yyyy" />
                                  {InputProps?.endAdornment}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      {coronaValue ? (
                        <div className="dateDiv2">
                          <NotificationsActiveIcon sx={{ color: '#81e3d7', margin: '0', padding: '0' }} />
                          <CloseRoundedIcon
                            onClick={() => {
                              deleteVaccine(2);
                            }}
                            fontSize="small"
                          />
                        </div>
                      ) : (
                        <div className="dateDiv2">
                          <NotificationsOffIcon sx={{ color: '#81e3d7', margin: '0', padding: '0' }} />
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
            <div className="dateFormVacc">
              <h4>????????????</h4>
              <div className="datePicker">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={10}>
                      <div className="dateDiv1">
                        <div className="dateTitle">????????????</div>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="??????????????????"
                              value={kennelValue}
                              minDate={new Date()}
                              onChange={(newValue) => {
                                const date = newValue.$d;
                                const kennelDate = date.toISOString().slice(0, 10);
                                setKennelValue(kennelDate);
                              }}
                              renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <input ref={inputRef} {...inputProps} placeholder="mm/dd/yyyy" />
                                  {InputProps?.endAdornment}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      {kennelValue ? (
                        <div className="dateDiv2">
                          <NotificationsActiveIcon sx={{ color: '#81e3d7', margin: '0', padding: '0' }} />
                          <CloseRoundedIcon
                            onClick={() => {
                              deleteVaccine(3);
                            }}
                            fontSize="small"
                          />
                        </div>
                      ) : (
                        <div className="dateDiv2">
                          <NotificationsOffIcon sx={{ color: '#81e3d7', margin: '0', padding: '0' }} />
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
            <div className="dateFormVacc">
              <h4>?????????</h4>
              <div className="datePicker">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={10}>
                      <div className="dateDiv1">
                        <div className="dateTitle">????????????</div>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="??????????????????"
                              value={rabisValue}
                              minDate={new Date()}
                              onChange={(newValue) => {
                                const date = newValue.$d;
                                const rabisDate = date.toISOString().slice(0, 10);
                                setRabisValue(rabisDate);
                              }}
                              renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <input ref={inputRef} {...inputProps} placeholder="mm/dd/yyyy" />
                                  {InputProps?.endAdornment}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      {rabisValue ? (
                        <div className="dateDiv2">
                          <NotificationsActiveIcon sx={{ color: '#81e3d7', margin: '0', padding: '0' }} />
                          <CloseRoundedIcon
                            onClick={() => {
                              deleteVaccine(4);
                            }}
                            fontSize="small"
                          />
                        </div>
                      ) : (
                        <div className="dateDiv2">
                          <NotificationsOffIcon sx={{ color: '#81e3d7', margin: '0', padding: '0' }} />
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
            {vaccineInfo && vaccineInfo.length > 0 ? (
              <button className="saveButton" type="submit" onClick={editVaccine}>
                ?????? ????????????
              </button>
            ) : (
              <button className="saveButton" type="submit" onClick={addVaccine}>
                ?????? ????????????
              </button>
            )}
          </VaccineForm>
          <MedicineForm>
            <div className="title">
              <h3>????????? ?????????</h3>
            </div>
            <div className="dateFormMed">
              <h4>??????????????????</h4>
              <p>
                <span style={{ fontWeight: 700 }}>??? ?????? ??? ??? </span>
                ????????? ?????? ?????? ????????????!
              </p>
              <div className="datePicker">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={10}>
                      <div className="dateDiv1">
                        <div className="dateTitle">????????????</div>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="????????????"
                              value={dirofilariaValue}
                              minDate={new Date()}
                              onChange={(newValue) => {
                                const date = newValue.$d;
                                const dirofilariaDate = date.toISOString().slice(0, 10);
                                setDirofilariaValue(dirofilariaDate);
                              }}
                              renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <input ref={inputRef} {...inputProps} placeholder="mm/dd/yyyy" />
                                  {InputProps?.endAdornment}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      {dirofilariaValue ? (
                        <div className="dateDiv2">
                          <NotificationsActiveIcon sx={{ color: '#81e3d7', margin: '0', padding: '0' }} />
                          <CloseRoundedIcon
                            onClick={() => {
                              deleteMedicine(1);
                            }}
                            fontSize="small"
                          />
                        </div>
                      ) : (
                        <div className="dateDiv2">
                          <NotificationsOffIcon sx={{ color: '#81e3d7', margin: '0', padding: '0' }} />
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
            <div className="dateFormMed">
              <h4>????????????</h4>
              <p>
                <span style={{ fontWeight: 700 }}>??? ?????? ??? ??? </span>
                ????????? ?????? ?????? ????????????!
              </p>
              <div className="datePicker">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={10}>
                      <div className="dateDiv1">
                        <div className="dateTitle">????????????</div>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="????????????"
                              value={tickValue}
                              minDate={new Date()}
                              onChange={(newValue) => {
                                const date = newValue.$d;
                                const tickDate = date.toISOString().slice(0, 10);
                                setTickValue(tickDate);
                              }}
                              renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <input ref={inputRef} {...inputProps} placeholder="mm/dd/yyyy" />
                                  {InputProps?.endAdornment}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      {tickValue ? (
                        <div className="dateDiv2">
                          <NotificationsActiveIcon sx={{ color: '#81e3d7', margin: '0', padding: '0' }} />
                          <CloseRoundedIcon
                            onClick={() => {
                              deleteMedicine(2);
                            }}
                            fontSize="small"
                          />
                        </div>
                      ) : (
                        <div className="dateDiv2">
                          <NotificationsOffIcon sx={{ color: '#81e3d7', margin: '0', padding: '0' }} />
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
            <div className="dateFormMed">
              <h4>?????????</h4>
              <p>
                <span style={{ fontWeight: 700 }}>??? ?????? ??? ??? </span>
                ????????? ?????? ?????? ????????????!
              </p>
              <div className="datePicker">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={10}>
                      <div className="dateDiv1">
                        <div className="dateTitle">????????????</div>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="??????????????????"
                              value={anthelminticValue}
                              minDate={new Date()}
                              onChange={(newValue) => {
                                const date = newValue.$d;
                                const anthelminticDate = date.toISOString().slice(0, 10);
                                setAnthelminticValue(anthelminticDate);
                              }}
                              renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <input ref={inputRef} {...inputProps} placeholder="mm/dd/yyyy" />
                                  {InputProps?.endAdornment}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      {anthelminticValue ? (
                        <div className="dateDiv2">
                          <NotificationsActiveIcon sx={{ color: '#81e3d7', margin: '0', padding: '0' }} />
                          <CloseRoundedIcon
                            onClick={() => {
                              deleteMedicine(3);
                            }}
                            fontSize="small"
                          />
                        </div>
                      ) : (
                        <div className="dateDiv2">
                          <NotificationsOffIcon sx={{ color: '#81e3d7', margin: '0', padding: '0' }} />
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
            {medicineInfo && medicineInfo.length > 0 ? (
              <button className="saveButton" type="submit" onClick={editMedicine}>
                ?????? ????????????
              </button>
            ) : (
              <button className="saveButton" type="submit" onClick={addMedicine}>
                ?????? ????????????
              </button>
            )}
          </MedicineForm>
        </CardDecoLine>
      </DogCard>
    </Wrap>
  );
}

export default PetMedicalCardDetail;
