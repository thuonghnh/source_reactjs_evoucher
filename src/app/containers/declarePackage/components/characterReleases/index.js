import React, { useState } from 'react'
import './style.css'
import { helper } from '../../../../common'
import { bindActionCreators } from "redux";
import * as declarePackageAction from "../../action";
import { connect } from 'react-redux';
import { Input, Select, ContainerScreen } from '../../../../components';
import ReplayIcon from '@material-ui/icons/Replay';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
const CharacterReleases = (props) => {
    const {
        eVoucherTypeId,
        codeLength,
        setCodeLength,
        characterSet,
        setCharacterSet,
        disallowedCharacters,
        setDisallowedCharacters,
        prefix,
        setPrefix,
        postfix,
        setPostfix,
        pattern,
        setPattern,
        declarePackageAction,
        setIsLoading,
        notifyWarning,
        notifyError,
        setIsErrorPatternSingleCode,
        genCharacterEpackage,
        generateQuantity,
        setGenerateQuantity,
        isDisableAll
    } = props;
    const [characterSetName, setCharacterSetName] = useState(lstCharacterType[0].value)

    //singlecode
    const selectCharacterSet = (item) => {
        setCharacterSetName(item.value)
        setDisallowedCharacters("")
        setPrefix("")
        setPostfix("")
        setPattern("")
    }

    const onChangePattern = (text) => {
        setPattern(helper.replaceCharacter(text, characterSetName))
    }

    const checkPartenCharacterEpackage = () => {
        if (!pattern) return;
        setIsLoading(true);
        declarePackageAction
            .checkPartenCharacterEpackage(pattern)
            .then((response) => {
                // console.log("response", response)
                if (response) {
                    setIsErrorPatternSingleCode(true)
                    notifyWarning("Mẫu ký tự bị trùng với những mã Evoucher đã tồn tại, Vui lòng khai báo lại!")
                } else {
                    setIsErrorPatternSingleCode(false)
                }
                setIsLoading(false)
            })
            .catch((error) => {
                notifyError(error.msgError)
                setIsLoading(false)
            });
    };

    //multicode
    const onChangeDisallowedCharacters = (text) => {
        // .replace(",,", ",")
        setGenerateQuantity("")
        setDisallowedCharacters(helper.replaceCharacter(text, characterSetName + ","))
    }

    const onChangeCodeLength = (text) => {
        if (text.charAt(0) === "0") {
            text = text.slice(1);
        }
        if (text && parseInt(text) > 20) text = "20";
        setGenerateQuantity("")
        setCodeLength(text)
    }

    const onChangePrefix = (text) => {
        // console.log(txt)
        setGenerateQuantity("")
        setPrefix(helper.replaceCharacter(text, characterSetName));
    }

    const onChangePostfix = (text) => {
        setGenerateQuantity("")
        setPostfix(helper.replaceCharacter(text, characterSetName));
    }

    const onBlurDisallowedCharacters = () => {
        let arr = helper.uniqueList(disallowedCharacters.split(",")).filter(x => x);
        setDisallowedCharacters(arr.join())
    }
    //xóa ký tự tồn tại trong ký tự loại bỏ
    const removeCharInDisallowedCharacters = (text) => {
        let arr = disallowedCharacters.split(",");
        text = text.toLowerCase();
        arr.forEach(x => {
            if (text.includes(x.toLowerCase())) {
                text = text.replaceAll(x.toLowerCase(), "")
            }
        });
        return text;
    }

    const onBLurPrefix = () => {
        setPrefix(removeCharInDisallowedCharacters(prefix))
    }

    const onBLurPostfix = () => {
        setPostfix(removeCharInDisallowedCharacters(postfix))
    }

    return (
        <ContainerScreen className="character-container">
            <div className="col-md-6 pd-botton">
                <div className="pd-span-bottom">
                    <span className="charactertype-name">Loại ký tự</span>
                </div>
                <Select
                    value={"id"}
                    display={"name"}
                    data={lstCharacterType}
                    valueSelect={characterSet}
                    setValueSelect={setCharacterSet}
                    onChange={selectCharacterSet}
                    className="select-charactertype"
                    hideClearIcon={true}
                    disabled={isDisableAll}
                />
            </div>
            <div className="col-md-6 pd-botton">
                <div className="charactersetname">
                    <span>Các ký tự cho phép phát sinh</span>
                </div>
                <Input
                    value={characterSetName}
                    type="text"
                    className="input-charactersetname"
                    disabled={true}
                />
            </div>
            {
                eVoucherTypeId === 1 ?
                    <React.Fragment>
                        <div className="col-md-6 pd-botton">
                            <Input
                                style={pattern ? styles.textTransform : null}
                                disabled={isDisableAll}
                                value={pattern}
                                type="text"
                                className="input-singlecode-patern"
                                onChange={(e) => onChangePattern(e.target.value)}
                                placeholder="Mẫu ký tự"
                                maxLength={100}
                                onBlur={checkPartenCharacterEpackage}
                            />
                            <span className="span-singlecode-patern">Mã phiếu thưởng của bạn sẽ có mẫu nhất định</span>
                        </div>
                        <div className="col-md-12 pd-botton">
                            <Input
                                style={pattern ? styles.textTransform : null}
                                value={pattern}
                                type="text"
                                className="input-singlecode-example"
                                placeholder="Minh họa chuỗi ký tự"
                                disabled={true}
                            />
                            <span className="span-singlecode-patern">Chuỗi ký tự minh họa của Evoucher</span>
                        </div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div className="col-md-6 pd-botton">
                            <Input
                                disabled={isDisableAll}
                                value={codeLength}
                                type="text"
                                className="input-codelength"
                                onChange={(e) => onChangeCodeLength(helper.validateNumber(e.target.value))}
                                placeholder="Nhập số ký tự"
                                maxLength={10}
                            />
                            {
                                codeLength && parseInt(codeLength) > 7 ?
                                    <span className="span-singlecode-patern">Tổng số ký tự quy định của mã Evoucher</span>
                                    :
                                    <span style={styles.textError} className="span-singlecode-patern">Tổng số ký tự quy định của mã Evoucher phải lớn hơn 8</span>
                            }

                        </div>
                        <div className="col-md-6 pd-botton">
                            <Input
                                style={disallowedCharacters ? styles.textTransform : null}
                                disabled={isDisableAll}
                                value={disallowedCharacters}
                                type="text"
                                className="input-disallowedCharacters"
                                onChange={(e) => onChangeDisallowedCharacters(e.target.value)}
                                placeholder="Nhập ký tự loại bỏ"
                                maxLength={200}
                                onBlur={onBlurDisallowedCharacters}
                            />
                            <span className="span-singlecode-patern">Ký tự loại bỏ nhập cách nhau bởi dấu ","</span>
                        </div>
                        <div className="col-md-6 pd-botton">
                            <Input
                                style={prefix ? styles.textTransform : null}
                                disabled={isDisableAll}
                                value={prefix}
                                type="text"
                                className="input-prefix"
                                onChange={(e) => onChangePrefix(e.target.value)}
                                placeholder="Ký tự đầu"
                                maxLength={codeLength ? parseInt(codeLength) - postfix.length : 0}
                                onBlur={onBLurPrefix}
                            />
                            <span className="span-singlecode-patern">Mã phiếu thưởng của bạn sẽ bắt đầu bằng một mã nhất định</span>
                        </div>
                        <div className="col-md-6 pd-botton">
                            <Input
                                style={postfix ? styles.textTransform : null}
                                disabled={isDisableAll}
                                value={postfix}
                                type="text"
                                className="input-postfix"
                                onChange={(e) => onChangePostfix(e.target.value)}
                                placeholder="Ký tự cuối"
                                maxLength={codeLength ? parseInt(codeLength) - prefix.length : 0}
                                onBlur={onBLurPostfix}
                            />
                            <span className="span-singlecode-patern">Mã phiếu thưởng của bạn sẽ kết thúc bằng 1 mã nhất định</span>
                        </div>
                        <div className="col-md-12 pd-botton">
                            <Input
                                value={pattern}
                                type="text"
                                className="input-multicode-example"
                                placeholder="Minh họa chuỗi ký tự"
                                disabled={true}
                            />
                            <button disabled={isDisableAll} onClick={genCharacterEpackage} className="btn-replayicon">
                                <ReplayIcon className={isDisableAll ? "disabled" : ""} style={styles.iconReplay} />
                            </button>
                            <span className="span-singlecode-patern">Chuỗi ký tự minh họa của Evoucher</span>
                            {
                                generateQuantity ?
                                    <div className="generate-quantity">
                                        <div>
                                            <ErrorOutlineIcon style={styles.errorOutlineIcon} />
                                            <span>Hiện có thể tạo {generateQuantity} mã Evoucher</span>
                                        </div>
                                    </div>
                                    : null
                            }

                        </div>
                    </React.Fragment>
            }
        </ContainerScreen>
    )
}

const styles = {
    iconReplay: {
        fontSize: "2.2rem"
    },
    errorOutlineIcon: {
        color: "#F6A822"
    },
    textTransform: {
        textTransform: "uppercase"
    },
    textError: {
        color: "red"
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
    declarePackageAction: bindActionCreators(declarePackageAction, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(CharacterReleases);

const lstCharacterType = [
    { id: "0", name: "Alphabetic", value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
    { id: "1", name: "Number", value: "0123456789" },
    { id: "2", name: "Alphanumberic", value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" }
]
