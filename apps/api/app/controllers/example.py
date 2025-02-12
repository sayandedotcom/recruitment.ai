
from flask_smorest import Blueprint

blp = Blueprint("Job", __name__, description="Job API")


@blp.route("/job")
def hello_world():
    return "<p>Hello, World!</p>"