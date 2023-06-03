from fastapi import FastAPI, HTTPException
from deta import Deta
from typing import Union
from fastapi import Body, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from const import ERR_MSG, OK_MSG
from hide import *
from config import settings

deta = Deta(settings.DETA_PK)
db = deta.Base(settings.DETA_NAME_DB)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_URL,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/{name_type}")
async def get_items(
    request: Request,
    name_type: str,
    _expand: Union[str, None] = None,
    _sort: Union[str, None] = None,
    _order: Union[str, None] = None,
):
    return get_hidden(db, name_type, request, _expand, _sort, _order)


@app.get("/{name_type}/{key}")
async def get_item_by_key(
    request: Request,
    name_type: str,
    key,
    _expand: Union[str, None] = None,
    _sort: Union[str, None] = None,
    _order: Union[str, None] = None,
):
    res = get_hidden(db, name_type, request, _expand, _sort, _order, key)
    return res[0]


@app.delete("/{name_type}/{key}")
async def delete_item_by_key(name_type: str, key: str):
    try:
        delete_hide(db, name_type, key)
        return OK_MSG
    except:
        raise HTTPException(status_code=400, detail=ERR_MSG)


@app.put("/{name_type}/{key}")
async def put_item_by_key(name_type: str, key: str, item: dict = Body(...)):
    try:
        item["type"] = name_type
        item["key"] = key
        item["id"] = key
        return db.put(item, key)
    except:
        raise HTTPException(status_code=400, detail=ERR_MSG)


@app.post("/{name_type}")
async def create_item(name_type: str, item: dict = Body(...)):
    try:
        item["type"] = name_type
        res = db.put(item)
        key = res["key"]
        res["id"] = key
        return db.put(res, key)
    except:
        raise HTTPException(status_code=400, detail=ERR_MSG)
