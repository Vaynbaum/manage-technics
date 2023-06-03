from typing import Union
from fastapi import Request
import itertools
import operator

name_query_params = set(["_expand", "_sort", "_order"])


def add_expand(
    _expand,
    res,
    db,
):
    expands = _expand.split(",")
    keys = list(set([i[f"{ex}Id"] for ex in expands for i in res if f"{ex}Id" in i]))
    q = [{"id": k} for k in keys]
    res_ex = db.fetch(q)
    res_ex = res_ex.items
    for rs in res:
        for ex in expands:
            if f"{ex}Id" in rs:
                rs[ex] = next(
                    (re for re in res_ex if re["id"] == rs[f"{ex}Id"]),
                    None,
                )
    return res


def add_sort(_sort, _order, res):
    field_sorts = _sort.split(",")
    modes = _order.split(",") if _order else []
    modes = [m if m == "asc" or m == "desc" else "asc" for m in modes][
        : len(field_sorts)
    ]
    field_modes = list(itertools.zip_longest(field_sorts, modes, fillvalue="asc"))

    for fm in field_modes[::-1]:
        res = sorted(res, key=operator.itemgetter(fm[0]), reverse=fm[1] == "desc")
    return res


def delete_hide(db, name_type: str, key: str):
    res = db.fetch({f"{name_type}Id": key})
    for r in res.items:
        db.delete(r["key"])
    db.delete(key)


def get_hidden(
    db,
    name_type: str,
    request: Request,
    _expand: Union[str, None],
    _sort: Union[str, None],
    _order: Union[str, None],
    key=None,
):
    query_params = request.query_params.multi_items()
    query = {p[0]: p[1] for p in query_params if not p[0] in name_query_params}
    query["type"] = name_type
    if key is not None:
        query["key"] = key
    res = db.fetch(query)
    res = res.items

    if _expand is not None:
        res = add_expand(_expand, res, db)
    if _sort is not None:
        res = add_sort(_sort, _order, res)
    return res
