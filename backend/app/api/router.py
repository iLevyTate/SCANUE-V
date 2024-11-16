from app.api.routes import health, login, users
from app.core.utils import APIRouter

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(login.router)
api_router.include_router(users.router)
