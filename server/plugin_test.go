package main

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestServeHTTP(t *testing.T) {
	t.Run("root", func(t *testing.T) {
		plugin := Plugin{}
		w := httptest.NewRecorder()
		r := httptest.NewRequest(http.MethodGet, "/", nil)

		plugin.ServeHTTP(nil, w, r)

		result := w.Result()
		assert.NotNil(t, result)
		assert.Equal(t, http.StatusNotFound, result.StatusCode)
	})

	t.Run("create", func(t *testing.T) {
		plugin := Plugin{}
		w := httptest.NewRecorder()
		r := httptest.NewRequest(http.MethodGet, "/create", nil)

		plugin.ServeHTTP(nil, w, r)

		result := w.Result()
		assert.NotNil(t, result)
		assert.Equal(t, http.StatusUnauthorized, result.StatusCode)
	})
}
