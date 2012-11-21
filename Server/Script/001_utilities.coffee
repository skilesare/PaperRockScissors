GUID = () ->
    S4 = ->
        result = Math.floor(Math.random() * 0x10000).toString(16)
        return result
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()
exports.GUID = GUID