import React, { useState, useEffect } from 'react'
import {
    ContainerScreen,
    Input,
    TimeKeeperCustom,
    DateMultipleCustom,
    Icon,
    DateCustom
} from '../../../../components';
import './style.css';
import day_active from '../../../../../assets/images/profileValueTimeApply/day_active.jpg'
import day_not_active from '../../../../../assets/images/profileValueTimeApply/day_not_active.jpg'
import special_day_active from '../../../../../assets/images/profileValueTimeApply/special_day_active.jpg'
import special_day_not_active from '../../../../../assets/images/profileValueTimeApply/special_day_not_active.jpg'
import { helper, date as FormatDate } from '../../../../common';

const TimeApply = (props) => {
    const {
        fromNumDays,
        setFromNumDays,
        type,
        setType,
        toNumDays,
        settoNumDays,
        weekDateList,
        setWeekDateList,
        specialDayList,
        setSpecialDayList,
        specialDayStart,
        setSpecialDayStart,
        specialDayEnd,
        setSpecialDayEnd,
        timeFrom,
        setTimeFrom,
        timeTo,
        setTimeTo,
        isDay,
        setIsDay,
        dataDayInWeek,
        setDataDayInWeek,
        dataDayLastWeek,
        setDataDayLastWeek,
        toast,
        objProfile
    } = props;

    const [isCheckDayOfInWeek, setIsCheckDayOfInWeek] = useState(0)
    const [isCheckDayOfLastWeek, setIsCheckDayOfLastWeek] = useState(0)

    useEffect(() => {
        if (!specialDayList) {
            if(dataDayInWeek.filter(x=>x.isChecked === 1).length === dataDayInWeek.length){
                setIsCheckAllDayOfInWeek(1)
            }
            if(dataDayLastWeek.filter(x=>x.isChecked === 1).length === dataDayLastWeek.length){
                setIsCheckDayOfLastWeek(1)
            }
        }
    }, [])

    const onClickIsDay = (n) => {
        setIsDay(n)
        if (n === 0) {
            setSpecialDayStart(null)
            setSpecialDayEnd(null)
            setSpecialDayList("")
        } else {
            setType(2)
            let termDataInWeek = [...dataDayInWeek];
            let termDataLastWeek = [...dataDayLastWeek];
            termDataInWeek.map(x => x.isChecked = 0);
            termDataLastWeek.map(x => x.isChecked = 0);
            setIsCheckDayOfInWeek(0)
            setIsCheckDayOfLastWeek(0)
            setDataDayInWeek(termDataInWeek)
            setDataDayLastWeek(termDataLastWeek)
            setWeekDateList("")
        }
    }

    const setIsCheckAllDayOfInWeek = () => {
        let termDataInWeek = [...dataDayInWeek];
        if (isCheckDayOfInWeek === 1) {
            setIsCheckDayOfInWeek(0)
            termDataInWeek.map(x => x.isChecked = 0);
        }
        else {
            setIsCheckDayOfInWeek(1)
            termDataInWeek.map(x => x.isChecked = 1);
            let termDataLastWeek = [...dataDayLastWeek];
            termDataLastWeek.map(x => x.isChecked = 0);
            setIsCheckDayOfLastWeek(0)
            setDataDayLastWeek(termDataLastWeek)
        }
        setDataDayInWeek(termDataInWeek)
        setType(1)
    }

    const setIsCheckAllDayOfLastWeek = () => {
        let termDataLastWeek = [...dataDayLastWeek]
        if (isCheckDayOfLastWeek === 1) {
            setIsCheckDayOfLastWeek(0)
            termDataLastWeek.map(x => x.isChecked = 0);
        } else {
            setIsCheckDayOfLastWeek(1)
            termDataLastWeek.map(x => x.isChecked = 1);
            let termDataInWeek = [...dataDayInWeek];
            termDataInWeek.map(x => x.isChecked = 0);
            setIsCheckDayOfInWeek(0)
            setDataDayInWeek(termDataInWeek)
        }
        setDataDayLastWeek(termDataLastWeek)
        setType(4)
    }

    const clickItemDayInWeek = (id) => {
        if (id < 7) {//trong tuần
            let termData = [...dataDayInWeek];
            let index = termData.findIndex(x => x.id === id);
            if (termData[index].isChecked === 1) {
                termData[index].isChecked = 0
            } else {
                termData[index].isChecked = 1;
            }
            setDataDayInWeek(termData)
            if (termData.filter(x => x.isChecked === 0).length === 0) {
                setIsCheckDayOfInWeek(1)
            } else {
                setIsCheckDayOfInWeek(0)
            }
            let termDataLastWeek = [...dataDayLastWeek];
            termDataLastWeek.map(x => x.isChecked = 0);
            setIsCheckDayOfLastWeek(0)
            setDataDayLastWeek(termDataLastWeek)
            setType(1)
        } else {//cuối tuần
            let termData = [...dataDayLastWeek];
            let index = termData.findIndex(x => x.id === id);
            if (termData[index].isChecked === 1) {
                termData[index].isChecked = 0
            } else {
                termData[index].isChecked = 1;
            }
            setDataDayLastWeek(termData)
            if (termData.filter(x => x.isChecked === 0).length === 0) {
                setIsCheckDayOfLastWeek(1)
            } else {
                setIsCheckDayOfLastWeek(0)
            }
            let termDataInWeek = [...dataDayInWeek];
            termDataInWeek.map(x => x.isChecked = 0);
            setIsCheckDayOfInWeek(0)
            setDataDayInWeek(termDataInWeek)
            setType(4)
        }
    }

    const changeTimeStart = (times) => {
        let timeF = times.formatted24;
        if (timeTo) {
            let arrTimeFrom = timeF.split(':');
            let arrTimeTo = timeTo.split(':');
            let hourFrom = parseInt(arrTimeFrom[0]);
            let minuteFrom = parseInt(arrTimeFrom[1]);
            let hourTo = parseInt(arrTimeTo[0])
            let minuteTo = parseInt(arrTimeTo[1])
            if (hourFrom > hourTo || (hourFrom === hourTo && minuteFrom > minuteTo)) {
                setTimeFrom(timeTo)
                toast.notifyWarning("Vui lòng chọn thời gian từ bé hơn thời gian đến!")
            }
        }
    }

    const changeTimeEnd = (times) => {
        let timeT = times.formatted24;
        if (timeFrom) {
            let arrTimeFrom = timeFrom.split(':');
            let arrTimeTo = timeT.split(':');
            let hourFrom = parseInt(arrTimeFrom[0]);
            let minuteFrom = parseInt(arrTimeFrom[1]);
            let hourTo = parseInt(arrTimeTo[0])
            let minuteTo = parseInt(arrTimeTo[1])
            if (hourFrom > hourTo || (hourFrom === hourTo && minuteFrom > minuteTo)) {
                setTimeTo(timeFrom)
                toast.notifyWarning("Vui lòng chọn thời gian đến lớn hơn thời gian từ!")
            }
        }
    }

    const changeSpecialDayStart = (dt) => {
        if (!specialDayEnd || specialDayEnd && FormatDate.DateDiff(dt, specialDayEnd) > 30) {
            const next30Date = FormatDate.getNext30Days(dt)
            setSpecialDayEnd(next30Date)
        }
    }

    const changeSpecialDayEnd = (dt) => {
        if (!specialDayStart || specialDayStart && FormatDate.DateDiff(dt, specialDayStart) > 30) {
            const prev30Date = FormatDate.getPrev30Days(dt)
            setSpecialDayStart(prev30Date)
        }
    }

    const RenderDayInWeek = ({ item }) => {
        return (
            <button style={item.isChecked === 1 ? styles.active : null} className="btn_item_day" onClick={() => clickItemDayInWeek(item.id)}>
                <i className="fa fa-calendar" aria-hidden="true"></i>
                <span>{item.name}</span>
            </button>
        )
    }

    const changeFromNumDay = (num) => {
        if (num.charAt(0) === "0") {
            num = num.slice(1);
        }
        if(!num){
            setFromNumDays("");
            return;
        }
        let d = FormatDate.DateDiff(objProfile.fromDate, objProfile.toDate);
        if(parseInt(num) > d){
            num = d;
        }
        if(toNumDays && parseInt(num) > parseInt(toNumDays)){
            num = toNumDays;
        }
        setFromNumDays(num)
    }

    const changeToNumDay = (num) => {
        if (num.charAt(0) === "0") {
            num = num.slice(1);
        }
        if(!num){
            settoNumDays("");
            return;
        } 
        let d = FormatDate.DateDiff(objProfile.fromDate, objProfile.toDate);
        if(parseInt(num) > d){
            num = d;
        }
        settoNumDays(num)
    }

    const onBlurToNumDay = () => {
        if(fromNumDays && parseInt(toNumDays) < parseInt(fromNumDays)){
            settoNumDays(fromNumDays)
        }
    }

    return (
        <ContainerScreen className="profile-value-timeapply">
            <div className="col-md-4 pd-botton">
                <div className="from-group">
                    <span className="exact-time">Từ ngày</span>
                    <Input
                        value={fromNumDays}
                        type="text"
                        className="input-keyword"
                        placeholder="Nhập số lượng ngày......"
                        onChange={(e) => changeFromNumDay(helper.validateNumber(e.target.value))}
                        maxLength={4}
                    />
                </div>

            </div>
            <div className="col-md-4 pd-botton">
                <div className="from-group">
                    <span className="exact-time">Đến ngày</span>
                    <Input
                        value={toNumDays}
                        type="text"
                        className="input-keyword"
                        placeholder="Nhập số lượng ngày......"
                        onChange={(e) => changeToNumDay(helper.validateNumber(e.target.value))}
                        maxLength={4}
                        onBlur={onBlurToNumDay}
                    />
                </div>
            </div>
            <div className="col-md-12">
                <span className="exact-time">Thời điểm nhất định trong ngày</span>
            </div>
            <div className="col-md-4 pd-botton">
                <div className="from-group">
                    <span>Thời gian từ</span>
                    <TimeKeeperCustom
                        value={timeFrom}
                        setValue={setTimeFrom}
                        hour24Mode={true}
                        switchToMinuteOnHourSelect={true}
                        onChange={changeTimeStart}
                    />
                </div>
            </div>
            <div className="col-md-4 pd-botton">
                <div className="from-group">
                    <span>Thời gian đến</span>
                    <TimeKeeperCustom
                        value={timeTo}
                        setValue={setTimeTo}
                        hour24Mode={true}
                        switchToMinuteOnHourSelect={true}
                        onChange={changeTimeEnd}
                    />
                </div>
            </div>
            <div className="col-md-12 pd-botton"></div>
            <div className="col-md-6 pd-botton">
                <div className="from-group-day">
                    <button onClick={() => onClickIsDay(0)} className="btn-day">
                        {
                            isDay == 0 ?
                                <img src={day_active} alt="" />
                                :
                                <img src={day_not_active} alt="" />
                        }
                        <span>Ngày trong tuần</span>
                    </button>
                    <button onClick={() => onClickIsDay(1)} className="btn-day">
                        {
                            isDay == 1 ?
                                <img src={special_day_active} alt="" />
                                :
                                <img src={special_day_not_active} alt="" />
                        }
                        <span>Ngày đặc biệt</span>
                    </button>
                </div>
            </div>
            {
                isDay == 0 ?
                    <React.Fragment>
                        <div className="col-md-12 pd-botton pd-top">
                            {
                                isCheckDayOfInWeek === 1 ?
                                    <Icon
                                        style={styles.iconActive}
                                        icon={"fa fa-check-square"}
                                        onClick={setIsCheckAllDayOfInWeek}
                                        className="icon-table"
                                    />
                                    :
                                    <Icon
                                        style={styles.iconActive}
                                        icon={"fa fa-square"}
                                        onClick={setIsCheckAllDayOfInWeek}
                                        className="icon-table"
                                    />
                            }
                            <span className="dayinweek_name">Ngày trong tuần</span>
                            {
                                dataDayInWeek.map((item, index) => {
                                    return (
                                        <RenderDayInWeek item={item} key={index} />
                                    )
                                })
                            }
                        </div>
                        <div className="col-md-12 pd-botton">
                            {
                                isCheckDayOfLastWeek === 1 ?
                                    <Icon
                                        style={styles.iconActive}
                                        icon={"fa fa-check-square"}
                                        onClick={setIsCheckAllDayOfLastWeek}
                                        className="icon-table"
                                    />
                                    :
                                    <Icon
                                        style={styles.iconActive}
                                        icon={"fa fa-square"}
                                        onClick={setIsCheckAllDayOfLastWeek}
                                        className="icon-table"
                                    />
                            }
                            <span className="dayinweek_name">Ngày trong tuần</span>
                            {
                                dataDayLastWeek.map((item, index) => {
                                    return (
                                        <RenderDayInWeek item={item} key={index} />
                                    )
                                })
                            }
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div className="col-md-12 pd-botton">
                        </div>
                        <div className="col-md-4 pd-botton">
                            <div className="from-group">
                                <span className="exact-time">Ngày bắt đầu</span>
                                <DateCustom
                                    maxDate={specialDayEnd}
                                    value={specialDayStart}
                                    setValue={setSpecialDayStart}
                                    placeholder={"Chọn ngày"}
                                    onChange={changeSpecialDayStart}
                                />
                            </div>
                        </div>
                        <div className="col-md-4 pd-botton">
                            <div className="from-group">
                                <span className="exact-time">Ngày kết thúc</span>
                                <DateCustom
                                    minDate={specialDayStart}
                                    value={specialDayEnd}
                                    setValue={setSpecialDayEnd}
                                    placeholder={"Chọn ngày"}
                                    onChange={changeSpecialDayEnd}
                                />
                            </div>
                        </div>
                        <div className="col-md-8 pd-botton">
                            <div className="from-group">
                                <span className="exact-time">Ngày bất kỳ</span>
                                <DateMultipleCustom
                                    value={specialDayList}
                                    setValue={setSpecialDayList}
                                    placeholder={"Chọn ngày"}
                                />
                            </div>
                        </div>
                    </React.Fragment>
            }
        </ContainerScreen>
    )
}

const styles = {
    active: {
        color: "#3BB8C3"
    },
    iconActive: {
        color: "#3BB8C3",
        fontSize: "1.2rem"
    }
}


export default TimeApply
