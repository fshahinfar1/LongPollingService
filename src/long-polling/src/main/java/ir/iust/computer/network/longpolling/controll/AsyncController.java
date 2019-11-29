package ir.iust.computer.network.longpolling.controll;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.List;

public abstract class AsyncController<T> {
    DeferredResult<ResponseEntity<List<T>>> createDifferResult() {
        DeferredResult<ResponseEntity<List<T>>> deferredResult = new DeferredResult<>(60000L);
        deferredResult.onTimeout(() -> deferredResult.setErrorResult(ResponseEntity
                .status(HttpStatus.REQUEST_TIMEOUT).body("Request timeout occurred.")));
        deferredResult.onError((Throwable t) -> deferredResult.setErrorResult(ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.")));
        return deferredResult;
    }
}
